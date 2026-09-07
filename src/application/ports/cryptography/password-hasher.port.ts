export interface PasswordHasher {
  hash(plainPassword: string): string;
}
