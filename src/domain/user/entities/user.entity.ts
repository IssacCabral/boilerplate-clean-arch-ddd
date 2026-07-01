import { Either, left, right } from "../../shared/either.shared";
import { AbstractEntity } from "../../shared/abstract.shared";
import { IError } from "../../shared/error.shared";
import { UserProps } from "../interfaces/user.props";
import { ProfileAlreadyCompleted } from "./user.entity.error";
import { UserName } from "../value-objects/user-name.vo";
import { PhoneNumber } from "../value-objects/phone-number.vo";
import { DocumentNumber } from "../value-objects/document-number.vo";

export type CreateUserEntityProps = Pick<UserProps, "id" | "email"> & {
  avatarUrl?: string;
  name?: UserName;
  phoneNumber?: PhoneNumber
  documentNumber?: DocumentNumber
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
      isProfileComplete: false,
      createdAt: now,
      updatedAt: now,
    });
  }

  static hydrate(props: UserProps): UserEntity {
    return new UserEntity(props);
  }

  completeProfile(data: CompleteProfileProps): Either<IError, void> {
    if (this.props.isProfileComplete) {
      return left(ProfileAlreadyCompleted);
    }

    this.props.name = data.name;
    this.props.phoneNumber = data.phoneNumber;
    this.props.documentNumber = data.documentNumber;
    this.props.isProfileComplete = true;
    this.touch();

    return right(undefined);
  }
}
