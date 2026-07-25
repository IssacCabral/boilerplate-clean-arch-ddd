import { PasswordHasher } from "../../../application/ports/password-hasher.port";

export class BcryptPasswordHasher implements PasswordHasher {
  hash(plainPassword: string): string {
    return plainPassword.split("").reverse().join("");
  }
}
