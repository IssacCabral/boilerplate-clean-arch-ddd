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
import { CompleteProfileFailedError } from "../errors/complete-profile-failed.error";

export class CompleteProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: CompleteProfileDto): Promise<CompleteProfileOutput> {
    try {
      const name = UserName.create(dto.name);
      const phone = PhoneNumber.create(dto.phone);
      const document = DocumentNumber.create(dto.document);

      const user = await this.userRepository.findById(dto.id);
      if (!user) {
        return left(UserNotFoundError);
      }

      user.completeProfile({
        documentNumber: document,
        phoneNumber: phone,
        name,
      });

      await this.userRepository.save(user);

      const exportedUser = user.export();

      return right({
        id: exportedUser.id,
        name: exportedUser.name!.getValue(),
        email: exportedUser.email.getValue(),
        isProfileCompleted: exportedUser.isProfileCompleted,
      });
    } catch (error: unknown) {
      console.log("complete-profile-usecase error: ", error);
      return left(CompleteProfileFailedError);
    }
  }
}
