import { GetUserController } from "../../../../../presentation/http/user/controllers/get-user.controller";
import { makeGetUserUseCase } from "../../../application/user/make-get-user-usecase";

export function makeGetUserController(): GetUserController {
  return new GetUserController(makeGetUserUseCase());
}
