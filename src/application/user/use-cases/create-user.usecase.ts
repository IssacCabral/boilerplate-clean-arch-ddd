import { left, right } from "../../../domain/@shared/either.shared";
import {
  CreateUserInputDto,
  CreateUserOutputDto,
} from "../dtos/create-user.dto";
import { UseCase } from "../../@shared/usecase.shared";
import { UserRepository } from "../../../domain/user/repositories/user.repository";
import { UserAlreadyExists } from "../errors/user-already-exists.error";
import { UserEntity } from "../../../domain/user/entities/user.entity";
import { Email } from "../../../domain/user/value-objects/email.vo";
import { UserName } from "../../../domain/user/value-objects/user-name.vo";
import { DocumentNumber } from "../../../domain/user/value-objects/document-number.vo";
import { PhoneNumber } from "../../../domain/user/value-objects/phone-number.vo";

export class CreateUserUseCase implements UseCase<
  CreateUserInputDto,
  CreateUserOutputDto
> {
  constructor(private readonly userRepository: UserRepository) {}

  async exec(input: CreateUserInputDto): Promise<CreateUserOutputDto> {
    try {
      const existingUser = await this.userRepository.findByEmail(input.email);
      if (existingUser) {
        return left(UserAlreadyExists);
      }

      const email = Email.create(input.email);
      const name = UserName.create(input.name);
      const documentNumber = DocumentNumber.create(input.document);
      const phoneNumber = PhoneNumber.create(input.phone);

      const user = UserEntity.create({
        id: Math.random().toString(36).substring(2, 15).toString(),
        email,
        name,
        documentNumber,
        phoneNumber,
      });

      await this.userRepository.create(user);

      const exportedUser = user.export();

      return right({
        id: exportedUser.id,
        document: exportedUser.documentNumber!.getValue(),
        email: exportedUser.email.getValue(),
        name: exportedUser.name!.getValue(),
        phone: exportedUser.phoneNumber!.getValue(),
      });
    } catch (error) {
      console.log("create-user-usecase error: ", error);
      return left({
        code: "",
        message: "",
        shortMessage: "",
      });
    }
  }
}
