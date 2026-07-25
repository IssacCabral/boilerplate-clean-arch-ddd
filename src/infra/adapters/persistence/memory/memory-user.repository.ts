import { UserEntity } from "../../../../domain/user/entities/user.entity";
import { UserRepository } from "../../../../domain/user/repositories/user.repository";

export class MemoryUserRepository implements UserRepository {
  private users: UserEntity[] = [];

  create(user: UserEntity): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }

  findById(id: string): Promise<UserEntity | null> {
    throw new Error("Method not implemented.");
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    throw new Error("Method not implemented.");
  }

  save(user: UserEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
