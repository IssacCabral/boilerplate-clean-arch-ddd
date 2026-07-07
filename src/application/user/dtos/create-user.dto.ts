import { Either } from "../../../domain/shared/either.shared";
import { IError } from "../../../domain/shared/error.shared";

export interface CreateUserInputDto {
  email: string;
  name: string;
  phone: string;
  document: string;
}

export type CreateUserOutputDto = Either<
  IError,
  {
    id: string;
    email: string;
    name: string;
    phone: string;
    document: string;
  }
>;
