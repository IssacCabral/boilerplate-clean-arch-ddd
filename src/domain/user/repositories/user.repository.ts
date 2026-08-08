import {
  PaginationData,
  PaginationParams,
} from "../../../@shared/pagination.shared";
import { UserEntity } from "../entities/user.entity";
import { UserStatus } from "../enums/user-status.enum";
import { Email } from "../value-objects/email.vo";

export interface ListUsersParams {
  where: {
    searchValue?: string;
    status?: UserStatus;
  } & PaginationParams;
}

export interface UserRepository {
  create(user: UserEntity): Promise<void>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: Email): Promise<UserEntity | null>;
  list(params: ListUsersParams): Promise<PaginationData<UserEntity>>;
  save(user: UserEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
