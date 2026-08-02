import { UserEntity } from "../../../../domain/user/entities/user.entity";
import { UserRepository } from "../../../../domain/user/repositories/user.repository";
import { Email } from "../../../../domain/user/value-objects/email.vo";
import { MemoryUserMapper, MemoryUserRecord } from "./memory-user.mapper";

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
      ? Promise.resolve(MemoryUserMapper.toEntity(record))
      : Promise.resolve(null);
  }

  findByEmail(email: Email): Promise<UserEntity | null> {
    const record = this.users.find((user) => user.email === email.getValue());
    return record
      ? Promise.resolve(MemoryUserMapper.toEntity(record))
      : Promise.resolve(null);
  }

  save(user: UserEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
