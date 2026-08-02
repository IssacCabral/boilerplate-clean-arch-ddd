import { UserEntity } from "../../../../domain/user/entities/user.entity";
import { UserStatus } from "../../../../domain/user/enums/user-status.enum";
import { DocumentNumber } from "../../../../domain/user/value-objects/document-number.vo";
import { Email } from "../../../../domain/user/value-objects/email.vo";
import { PasswordHash } from "../../../../domain/user/value-objects/password-hash.vo";
import { PhoneNumber } from "../../../../domain/user/value-objects/phone-number.vo";
import { UserName } from "../../../../domain/user/value-objects/user-name.vo";

export type MemoryUserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
  phoneNumber?: string;
  documentNumber?: string;
  status: UserStatus;
  avatarUrl?: string;
  isProfileCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export class MemoryUserMapper {
  static toEntity(raw: MemoryUserRecord): UserEntity {
    return UserEntity.hydrate({
      id: raw.id,
      email: Email.create(raw.email),
      passwordHash: PasswordHash.create(raw.passwordHash),
      name: raw.name ? UserName.create(raw.name) : undefined,
      phoneNumber: raw.phoneNumber
        ? PhoneNumber.create(raw.phoneNumber)
        : undefined,
      documentNumber: raw.documentNumber
        ? DocumentNumber.create(raw.documentNumber)
        : undefined,
      status: raw.status,
      avatarUrl: raw.avatarUrl ?? undefined,
      isProfileCompleted: raw.isProfileCompleted,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  // pode ser usado em create, save... mas também poderiamos criar um método para cada caso específico
  // ex: toCreate, toSave, toUpdate, etc.
  static toPersistence(user: UserEntity): MemoryUserRecord {
    const exportedUser = user.export();
    return {
      id: exportedUser.id,
      email: exportedUser.email.getValue(),
      name: exportedUser.name?.getValue(),
      phoneNumber: exportedUser.phoneNumber?.getValue(),
      documentNumber: exportedUser.documentNumber?.getValue(),
      avatarUrl: exportedUser.avatarUrl,
      isProfileCompleted: exportedUser.isProfileCompleted,
      passwordHash: exportedUser.passwordHash.getValue(),
      status: exportedUser.status,
      createdAt: exportedUser.createdAt,
      updatedAt: exportedUser.updatedAt,
    };
  }
}
