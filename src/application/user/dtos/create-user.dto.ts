import { Either } from "../../../@shared/either.shared";
import { IError } from "../../../@shared/error.shared";
import { UserDto } from "./user.dto";

export interface CreateUserInputDto {
  email: string;
  password: string;
  roleId: string;
}

export type CreateUserOutputDto = Either<IError, UserDto>;
