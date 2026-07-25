import { left, right } from "../../../@shared/either.shared";
import {
  CreateUserInputDto,
  CreateUserOutputDto,
} from "../dtos/create-user.dto";
import { UseCase } from "../../@shared/usecase.shared";
import { UserRepository } from "../../../domain/user/repositories/user.repository";
import { UserAlreadyExists } from "../errors/user-already-exists.error";
import { UserEntity } from "../../../domain/user/entities/user.entity";
import { Email } from "../../../domain/user/value-objects/email.vo";
import { PasswordHash } from "../../../domain/user/value-objects/password-hash.vo";
import { Password } from "../../../domain/user/value-objects/password.vo";
import { PasswordHasher } from "../../ports/password-hasher.port";

export class CreateUserUseCase implements UseCase<
  CreateUserInputDto,
  CreateUserOutputDto
> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async exec(input: CreateUserInputDto): Promise<CreateUserOutputDto> {
    try {
      const existingUser = await this.userRepository.findByEmail(input.email);
      if (existingUser) {
        return left(UserAlreadyExists);
      }

      const password = Password.create(input.password);
      const hashedPassword = this.passwordHasher.hash(password.getValue());
      const passwordHash = PasswordHash.create(hashedPassword);

      const user = UserEntity.create({
        id: Math.random().toString(36).substring(2, 15).toString(),
        email: Email.create(input.email),
        passwordHash,
      });

      await this.userRepository.create(user);

      const exportedUser = user.export();

      return right({
        id: exportedUser.id,
        email: exportedUser.email.getValue(),
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
