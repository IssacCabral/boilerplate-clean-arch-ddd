import { UseCase } from "../../../../application/@shared/usecase.shared";
import {
  CompleteProfileInputDto,
  CompleteProfileOutputDto,
} from "../../../../application/user/dtos/complete-profile.dto";
import {
  CreateUserInputDto,
  CreateUserOutputDto,
} from "../../../../application/user/dtos/create-user.dto";
import {
  GetUserInputDto,
  GetUserOutputDto,
} from "../../../../application/user/dtos/get-user.dto";
import {
  ListUsersInputDto,
  ListUsersOutputDto,
} from "../../../../application/user/dtos/list-users.dto";

interface Controller {
  handle(): Promise<void>;
}

export type UserControllerUseCases = {
  createUser: UseCase<CreateUserInputDto, CreateUserOutputDto>;
  completeProfile: UseCase<CompleteProfileInputDto, CompleteProfileOutputDto>;
  getUser: UseCase<GetUserInputDto, GetUserOutputDto>;
  listUsers: UseCase<ListUsersInputDto, ListUsersOutputDto>;
};

export class UserController implements Controller {
  constructor(readonly useCases: UserControllerUseCases) {}

  async handle(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
