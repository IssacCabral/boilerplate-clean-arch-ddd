import { CreateUserController } from "../../../../../presentation/http/user/controllers/create-user.controller";
import { makeCreateUserUseCase } from "../../../application/user/make-create-user-usecase";

export function makeCreateUserController(): CreateUserController {
  return new CreateUserController(makeCreateUserUseCase());
}
