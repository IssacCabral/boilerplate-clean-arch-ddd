import { Either } from "../../../@shared/either.shared";
import { IError } from "../../../@shared/error.shared";

export interface CompleteProfileDto {
  id: string;
  email: string;
  phone: string;
  document: string;
  name: string;
}

export type CompleteProfileOutput = Either<
  IError,
  {
    id: string;
    name: string;
    email: string;
    isProfileCompleted: boolean;
  }
>;
