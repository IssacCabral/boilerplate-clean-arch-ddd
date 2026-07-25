import { Either } from "../../../@shared/either.shared";
import { IError } from "../../../@shared/error.shared";

export interface CreateUserInputDto {
  email: string;
  password: string;
}

export type CreateUserOutputDto = Either<
  IError,
  {
    id: string;
    email: string;
  }
>;
