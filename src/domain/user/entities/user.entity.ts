import { Either, left, right } from "../../../@shared/either.shared";
import { AbstractEntity } from "../../@shared/abstract.shared";
import { IError } from "../../../@shared/error.shared";
import { UserProps } from "../interfaces/user.props";
import { ProfileAlreadyCompleted } from "./user.entity.error";
import { UserName } from "../value-objects/user-name.vo";
import { PhoneNumber } from "../value-objects/phone-number.vo";
import { DocumentNumber } from "../value-objects/document-number.vo";
import { UserStatus } from "../enums/user-status.enum";

export type CreateUserEntityProps = Pick<
  UserProps,
  "id" | "email" | "passwordHash"
> & {
  avatarUrl?: string;
  name?: UserName;
  phoneNumber?: PhoneNumber;
  documentNumber?: DocumentNumber;
};

interface CompleteProfileProps {
  name: UserName;
  phoneNumber: PhoneNumber;
  documentNumber: DocumentNumber;
}

export class UserEntity extends AbstractEntity<UserProps> {
  static create(props: CreateUserEntityProps): UserEntity {
    const now = new Date();
    return new UserEntity({
      id: props.id,
      email: props.email,
      passwordHash: props.passwordHash,
      isProfileCompleted: false,
      status: UserStatus.Active,
      createdAt: now,
      updatedAt: now,
    });
  }

  static hydrate(props: UserProps): UserEntity {
    return new UserEntity(props);
  }

  deactivate(): void {
    this.props.status = UserStatus.Inactive;
    this.touch();
  }

  activate(): void {
    this.props.status = UserStatus.Active;
    this.touch();
  }

  completeProfile(data: CompleteProfileProps): Either<IError, void> {
    if (this.props.isProfileCompleted) {
      return left(ProfileAlreadyCompleted);
    }

    this.props.name = data.name;
    this.props.phoneNumber = data.phoneNumber;
    this.props.documentNumber = data.documentNumber;
    this.props.isProfileCompleted = true;
    this.touch();

    return right(undefined);
  }
}
