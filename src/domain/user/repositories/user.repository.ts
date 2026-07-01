import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
  create(user: UserEntity): Promise<void>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>; // todo: levantar discussão sobre o input: Receber email string ou EmailValueObject?
  save(user: UserEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
