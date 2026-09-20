import { ListUsersController } from "../../../../../presentation/http/user/controllers/list-users.controller";
import { makeListUsersUseCase } from "../../../application/user/make-list-users-usecase";

export function makeListUsersController(): ListUsersController {
  return new ListUsersController(makeListUsersUseCase());
}
