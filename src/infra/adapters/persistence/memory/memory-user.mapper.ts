import { UserEntity } from "../../../../domain/user/entities/user.entity";
import { UserProps } from "../../../../domain/user/interfaces/user.props";
import { DocumentNumber } from "../../../../domain/user/value-objects/document-number.vo";
import { Email } from "../../../../domain/user/value-objects/email.vo";
import { PhoneNumber } from "../../../../domain/user/value-objects/phone-number.vo";
import { UserName } from "../../../../domain/user/value-objects/user-name.vo";

// todo: verificar, pois recebe como já UserProps que já vem com value objects
export class MemoryUserMapper {
  static toEntity(raw: UserProps): UserEntity {
    return UserEntity.hydrate({
      id: raw.id,
      email: Email.create(raw.email.getValue()), // todo: verificar, pois recebe como Email
      passwordHash: raw.passwordHash,
      status: raw.status,
      name: raw.name ? UserName.create(raw.name.getValue()) : undefined,
      phoneNumber: raw.phoneNumber
        ? PhoneNumber.create(raw.phoneNumber.getValue())
        : undefined,
      documentNumber: raw.documentNumber
        ? DocumentNumber.create(raw.documentNumber.getValue())
        : undefined,
      avatarUrl: raw.avatarUrl ?? undefined,
      isProfileCompleted: raw.isProfileCompleted,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(user: UserEntity) {
    const exportedUser = user.export();
    return {
      id: exportedUser.id,
      email: exportedUser.email.getValue(),
      name: exportedUser.name?.getValue(),
      phoneNumber: exportedUser.phoneNumber?.getValue(),
      documentNumber: exportedUser.documentNumber?.getValue(),
      avatarUrl: exportedUser.avatarUrl,
      isProfileComplete: exportedUser.isProfileCompleted,
      createdAt: exportedUser.createdAt,
      updatedAt: exportedUser.updatedAt,
    };
  }
}
