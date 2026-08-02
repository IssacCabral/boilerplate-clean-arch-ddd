import { UserEntity } from "../../../domain/user/entities/user.entity";
import { UserDto } from "../dtos/user.dto";

export class UserDtoMapper {
  static toDto(user: UserEntity): UserDto {
    const userProps = user.export();
    return {
      id: userProps.id,
      email: userProps.email.getValue(),
      name: userProps.name?.getValue(),
      phoneNumber: userProps.phoneNumber?.getValue(),
      documentNumber: userProps.documentNumber?.getValue(),
      status: userProps.status,
      avatarUrl: userProps.avatarUrl,
      isProfileCompleted: userProps.isProfileCompleted,
    };
  }

  // TODO: outros mappers com relacionamentos, de acordo com o dto
}
