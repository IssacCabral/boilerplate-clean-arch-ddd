import {
  CompleteProfileDto,
  CompleteProfileOutput,
} from "../dtos/complete-profile.dto";
import { PhoneNumber } from "../../../domain/user/value-objects/phone-number.vo";
import { DocumentNumber } from "../../../domain/user/value-objects/document-number.vo";
import { UserRepository } from "../../../domain/user/repositories/user.repository";
import { UserName } from "../../../domain/user/value-objects/user-name.vo";
import { left, right } from "../../../@shared/either.shared";
import { UserNotFoundError } from "../errors/user-not-found.error";
import { UseCase } from "../../@shared/usecase.shared";

export class CompleteProfileUseCase implements UseCase<
  CompleteProfileDto,
  CompleteProfileOutput
> {
  constructor(private readonly userRepository: UserRepository) {}

  async exec(dto: CompleteProfileDto): Promise<CompleteProfileOutput> {
    const name = UserName.create(dto.name);
    if (name.isLeft()) {
      return left(name.value);
    }

    const phone = PhoneNumber.create(dto.phone);
    if (phone.isLeft()) {
      return left(phone.value);
    }

    const document = DocumentNumber.create(dto.document);
    if (document.isLeft()) {
      return left(document.value);
    }

    const user = await this.userRepository.findById(dto.id);
    if (!user) {
      return left(UserNotFoundError);
    }

    const result = user.completeProfile({
      documentNumber: document.value,
      phoneNumber: phone.value,
      name: name.value,
    });
    if (result.isLeft()) {
      return left(result.value);
    }

    await this.userRepository.save(user);

    const exportedUser = user.export();

    return right({
      id: exportedUser.id,
      name: exportedUser.name!.getValue(),
      email: exportedUser.email.getValue(),
      isProfileCompleted: exportedUser.isProfileCompleted,
    });
  }
}
