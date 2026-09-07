import { UseCase } from "../../../../application/@shared/usecase.shared";
import {
  CreateUserInputDto,
  CreateUserOutputDto,
} from "../../../../application/user/dtos/create-user.dto";
import { UserDto } from "../../../../application/user/dtos/user.dto";
import { CreateUserFailedError } from "../../../../application/user/errors/create-user-failed.error";
import { CreateUserUseCase } from "../../../../application/user/use-cases/create-user.usecase";
import { SafeUseCase } from "../../../decorators/safe-usecase.decorator";
import { makePasswordHasher } from "../../infra/cryptography/make-password-hasher";
import { makeRoleRepository } from "../../infra/persistence/access-control/role/make-role-repository";
import { makeUserRepository } from "../../infra/persistence/user/make-user-repository";

export function makeCreateUserUseCase(): UseCase<
  CreateUserInputDto,
  CreateUserOutputDto
> {
  const userRepository = makeUserRepository();
  const passwordHasher = makePasswordHasher();
  const roleRepository = makeRoleRepository();

  const createUserUseCase = new CreateUserUseCase(
    userRepository,
    passwordHasher,
    roleRepository,
  );

  return new SafeUseCase<CreateUserInputDto, UserDto>(
    createUserUseCase,
    CreateUserFailedError,
  );
}
