import { Either } from "../../../@shared/either.shared";
import { IError } from "../../../@shared/error.shared";
import { UserDto } from "./user.dto";

export interface GetUserInputDto {
  id: string;
}

export type GetUserOutputDto = Either<IError, UserDto>;
