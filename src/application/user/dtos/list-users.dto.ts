import { Either } from "../../../@shared/either.shared";
import { IError } from "../../../@shared/error.shared";
import {
  PaginationData,
  PaginationParams,
} from "../../../@shared/pagination.shared";
import { UserDto } from "./user.dto";

export interface ListUsersInputDto extends PaginationParams {
  searchValue?: string;
}

export type ListUsersOutputDto = Either<IError, PaginationData<UserDto>>;
