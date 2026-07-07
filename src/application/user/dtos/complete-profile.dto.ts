export interface CompleteProfileDto {
  id: string;
  email: string;
  phone: string;
  document: string;
  name: string;
}

export interface CompleteProfileOutput {
  id: string;
  name: string;
  email: string;
  isProfileCompleted: boolean;
}
