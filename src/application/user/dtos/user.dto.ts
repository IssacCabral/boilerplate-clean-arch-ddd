import { UserStatus } from "../../../domain/user/enums/user-status.enum";

export interface UserDto {
  id: string;
  email: string;
  name?: string;
  phoneNumber?: string;
  documentNumber?: string;
  status: UserStatus;
  avatarUrl?: string;
  isProfileCompleted: boolean;
}

// adicionar relações aqui

// export interface UserWithRoleDto extends UserDto {
//   role: RoleDto;
// }

// export interface UserWithBooksDto extends UserDto {
//   books: BookDto[];
// }

// export interface UserDetailsDto extends UserDto {
//   role: RoleDto;
//   books: BookDto[];
// }
