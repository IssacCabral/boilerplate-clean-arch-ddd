import {
  CompleteProfileInputDto,
  CompleteProfileOutputDto,
} from "../dtos/complete-profile.dto";
import { PhoneNumber } from "../../../domain/user/value-objects/phone-number.vo";
import { DocumentNumber } from "../../../domain/user/value-objects/document-number.vo";
import { UserRepository } from "../../../domain/user/repositories/user.repository";
import { UserName } from "../../../domain/user/value-objects/user-name.vo";
import { Either, left, right } from "../../../@shared/either.shared";
import { UserNotFoundError } from "../errors/user-not-found.error";
import { UseCase } from "../../@shared/usecase.shared";
import { IError } from "../../../@shared/error.shared";
import { UserDtoMapper } from "../mappers/user-dto.mapper";

export class CompleteProfileUseCase implements UseCase<
  CompleteProfileInputDto,
  CompleteProfileOutputDto
> {
  constructor(private readonly userRepository: UserRepository) {}

  async exec(dto: CompleteProfileInputDto): Promise<CompleteProfileOutputDto> {
    const profileData = this.buildCompleteProfileData(dto);
    if (profileData.isLeft()) {
      return left(profileData.value);
    }

    const user = await this.userRepository.findById(dto.id);
    if (!user) {
      return left(UserNotFoundError);
    }

    const result = user.completeProfile(profileData.value);
    if (result.isLeft()) {
      return left(result.value);
    }

    await this.userRepository.save(user);

    return right(UserDtoMapper.toDto(user));
  }

  private buildCompleteProfileData(dto: CompleteProfileInputDto): Either<
    IError,
    {
      name: UserName;
      phoneNumber: PhoneNumber;
      documentNumber: DocumentNumber;
    }
  > {
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

    return right({
      name: name.value,
      phoneNumber: phone.value,
      documentNumber: document.value,
    });
  }
}
