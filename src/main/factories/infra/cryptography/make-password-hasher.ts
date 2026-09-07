import { PasswordHasher } from "../../../../application/ports/cryptography/password-hasher.port";
import { BcryptPasswordHasher } from "../../../../infra/adapters/cryptography/bcrypt-password-hasher.adapter";

export function makePasswordHasher(): PasswordHasher {
  return new BcryptPasswordHasher();
}
