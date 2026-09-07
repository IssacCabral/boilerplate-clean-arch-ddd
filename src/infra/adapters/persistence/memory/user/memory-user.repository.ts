import { PaginationData } from "../../../../../@shared/pagination.shared";
import { UserEntity } from "../../../../../domain/user/entities/user.entity";
import {
  ListUsersParams,
  UserRepository,
} from "../../../../../domain/user/repositories/user.repository";
import { Email } from "../../../../../domain/user/value-objects/email.vo";
import { MemoryUserMapper, MemoryUserRecord } from "../user/memory-user.mapper";

export class MemoryUserRepository implements UserRepository {
  private users: MemoryUserRecord[] = [];

  create(user: UserEntity): Promise<void> {
    const record = MemoryUserMapper.toPersistence(user);
    this.users.push(record);
    return Promise.resolve();
  }

  findById(id: string): Promise<UserEntity | null> {
    const record = this.users.find((user) => user.id === id);
    return record
      ? Promise.resolve(MemoryUserMapper.toDomain(record))
      : Promise.resolve(null);
  }

  findByEmail(email: Email): Promise<UserEntity | null> {
    const record = this.users.find((user) => user.email === email.getValue());
    return record
      ? Promise.resolve(MemoryUserMapper.toDomain(record))
      : Promise.resolve(null);
  }

  async list(params: ListUsersParams): Promise<PaginationData<UserEntity>> {
    const { page = 1, perPage = 10, searchValue, status } = params.where;

    const users = this.users.filter((user) => {
      if (searchValue && !user.email.includes(searchValue)) return false;
      if (status && user.status !== status) return false;
      return true;
    });

    return {
      meta: {
        page,
        perPage,
        total: users.length,
        hasNext: false,
      },
      data: users.map(MemoryUserMapper.toDomain),
    };
  }

  save(user: UserEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
