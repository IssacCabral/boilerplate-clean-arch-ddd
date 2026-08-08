import { Either } from "../../../@shared/either.shared";
import { IError } from "../../../@shared/error.shared";
import {
  PaginationData,
  PaginationParams,
} from "../../../@shared/pagination.shared";
import { UserStatus } from "../../../domain/user/enums/user-status.enum";
import { UserDto } from "./user.dto";

export interface ListUsersInputDto extends PaginationParams {
  searchValue?: string;
  status?: UserStatus;
}

export type ListUsersOutputDto = Either<IError, PaginationData<UserDto>>;
