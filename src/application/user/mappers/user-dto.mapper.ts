import { UserEntity } from "../../../domain/user/entities/user.entity";
import { UserDto } from "../dtos/user.dto";

export class UserDtoMapper {
  static toDto(user: UserEntity): UserDto {
    const userData = user.export();
    return {
      id: userData.id,
      email: userData.email.getValue(),
      name: userData.name?.getValue(),
      phoneNumber: userData.phoneNumber?.getValue(),
      documentNumber: userData.documentNumber?.getValue(),
      status: userData.status,
      avatarUrl: userData.avatarUrl,
      isProfileCompleted: userData.isProfileCompleted,
    };
  }

  // TODO: outros mappers com relacionamentos, de acordo com o dto
}
