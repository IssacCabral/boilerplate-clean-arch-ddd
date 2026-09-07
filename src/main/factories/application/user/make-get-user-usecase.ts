import { UseCase } from "../../../../application/@shared/usecase.shared";
import {
  GetUserInputDto,
  GetUserOutputDto,
} from "../../../../application/user/dtos/get-user.dto";
import { UserDto } from "../../../../application/user/dtos/user.dto";
import { GetUserFailedError } from "../../../../application/user/errors/get-user-failed.error";
import { GetUserUseCase } from "../../../../application/user/use-cases/get-user.usecase";
import { SafeUseCase } from "../../../decorators/safe-usecase.decorator";
import { makeUserRepository } from "../../infra/persistence/user/make-user-repository";

export function makeGetUserUseCase(): UseCase<GetUserInputDto, GetUserOutputDto> {
  const userRepository = makeUserRepository();
  const getUserUseCase = new GetUserUseCase(userRepository);

  return new SafeUseCase<GetUserInputDto, UserDto>(
    getUserUseCase,
    GetUserFailedError,
  );
}
