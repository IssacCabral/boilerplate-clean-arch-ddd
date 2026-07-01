export interface CreateUserDto {
  email: string;
  name: string;
  phone: string;
  document: string;
}

export interface CreateUserOutput {
  id: string;
  email: string;
  name: string;
  phone: string;
  document: string;
}