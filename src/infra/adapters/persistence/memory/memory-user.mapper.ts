import { RoleEntity } from "../../../../domain/access-control/role/entities/role.entity";
import { UserEntity } from "../../../../domain/user/entities/user.entity";
import { UserStatus } from "../../../../domain/user/enums/user-status.enum";
import { DocumentNumber } from "../../../../domain/user/value-objects/document-number.vo";
import { Email } from "../../../../domain/user/value-objects/email.vo";
import { PasswordHash } from "../../../../domain/user/value-objects/password-hash.vo";
import { PhoneNumber } from "../../../../domain/user/value-objects/phone-number.vo";
import { UserName } from "../../../../domain/user/value-objects/user-name.vo";
import { MemoryRoleMapper, MemoryRoleRecord } from "./memory-role.mapper";

export type MemoryUserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
  phoneNumber?: string;
  documentNumber?: string;
  role?: MemoryRoleRecord;
  status: UserStatus;
  avatarUrl?: string;
  isProfileCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export class MemoryUserMapper {
  static toEntity(raw: MemoryUserRecord): UserEntity {
    let role: MemoryRoleRecord | undefined;

    if (raw.role) {
      role = MemoryRoleMapper.toEntity(raw.role).export();
    }

    return UserEntity.hydrate({
      id: raw.id,
      email: Email.restore(raw.email),
      passwordHash: PasswordHash.restore(raw.passwordHash),
      name: raw.name ? UserName.restore(raw.name) : undefined,
      phoneNumber: raw.phoneNumber
        ? PhoneNumber.restore(raw.phoneNumber)
        : undefined,
      documentNumber: raw.documentNumber
        ? DocumentNumber.restore(raw.documentNumber)
        : undefined,
      role,
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
    const userProps = user.export();
    return {
      id: userProps.id,
      email: userProps.email.getValue(),
      name: userProps.name?.getValue(),
      phoneNumber: userProps.phoneNumber?.getValue(),
      documentNumber: userProps.documentNumber?.getValue(),
      role: userProps.role
        ? MemoryRoleMapper.toPersistence(RoleEntity.hydrate(userProps.role))
        : undefined,
      avatarUrl: userProps.avatarUrl,
      isProfileCompleted: userProps.isProfileCompleted,
      passwordHash: userProps.passwordHash.getValue(),
      status: userProps.status,
      createdAt: userProps.createdAt,
      updatedAt: userProps.updatedAt,
    };
  }
}
