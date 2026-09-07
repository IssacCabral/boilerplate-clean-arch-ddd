import { UserRepository } from "../../../../../domain/user/repositories/user.repository";
import { MemoryUserRepository } from "../../../../../infra/adapters/persistence/memory/user/memory-user.repository";

const userRepository = new MemoryUserRepository();

export function makeUserRepository(): UserRepository {
  return userRepository;
}
