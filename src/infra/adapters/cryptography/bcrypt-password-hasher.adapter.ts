import { PasswordHasher } from "../../../application/ports/cryptography/password-hasher.port";

export class BcryptPasswordHasher implements PasswordHasher {
  hash(plainPassword: string): string {
    return `fake-bcrypt-hash:${plainPassword.split("").reverse().join("")}`;
  }
}
