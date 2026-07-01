import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  update(user: UserEntity): Promise<void>; // todo: levantar discussão sobre o input: receber propriedades ou objeto de domínio?
}
