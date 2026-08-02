import { Either } from "../../../@shared/either.shared";
import { IError } from "../../../@shared/error.shared";
import { UserDto } from "./user.dto";

export interface CompleteProfileInputDto {
  id: string;
  email: string;
  phone: string;
  document: string;
  name: string;
}

export type CompleteProfileOutputDto = Either<IError, UserDto>;
