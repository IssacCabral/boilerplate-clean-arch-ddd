import {
  CompleteProfileDto,
  CompleteProfileOutput,
} from "../dto/complete-profile.dto";
import { PhoneNumber } from "../../domain/user/value-objects/phone-number.vo";
import { DocumentNumber } from "../../domain/user/value-objects/document-number.vo";
import { UserRepository } from "../../domain/user/repositories/user.repository";
import { UserName } from "../../domain/user/value-objects/user-name.vo";

export class CompleteProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: CompleteProfileDto): Promise<CompleteProfileOutput> {
    try {
      const name = UserName.create(dto.name);
      const phone = PhoneNumber.create(dto.phone);
      const document = DocumentNumber.create(dto.document);

      // buscar user do banco e completar o perfil
      const user = await this.userRepository.findById(dto.id);
      if (!user) {
        throw new Error("User not found");
      }

      user.completeProfile({
        documentNumber: document,
        phoneNumber: phone,
        name,
      });

      await this.userRepository.update(user);

      const exportedUser = user.export();

      return {
        id: exportedUser.id,
        name: exportedUser.name!.getValue(),
        email: exportedUser.email.getValue(),
        isProfileComplete: exportedUser.isProfileComplete,
      };
    } catch (error: unknown) {
      console.log("complete-profile-usecase error: ", error);
      return {
        id: "",
        name: "",
        email: "",
        isProfileComplete: false,
      };
    }
  }
}
