import { UserController } from "../../../../../presentation/http/user/controllers/user.controller";
import { makeCompleteProfileUseCase } from "../../../application/user/make-complete-profile-usecase";
import { makeCreateUserUseCase } from "../../../application/user/make-create-user-usecase";
import { makeGetUserUseCase } from "../../../application/user/make-get-user-usecase";
import { makeListUsersUseCase } from "../../../application/user/make-list-users-usecase";

export function makeUserController(): UserController {
  return new UserController({
    createUser: makeCreateUserUseCase(),
    completeProfile: makeCompleteProfileUseCase(),
    getUser: makeGetUserUseCase(),
    listUsers: makeListUsersUseCase(),
  });
}
