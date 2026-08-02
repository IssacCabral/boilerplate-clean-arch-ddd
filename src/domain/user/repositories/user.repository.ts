import { UserEntity } from "../entities/user.entity";
import { Email } from "../value-objects/email.vo";

export interface UserRepository {
  create(user: UserEntity): Promise<void>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: Email): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
