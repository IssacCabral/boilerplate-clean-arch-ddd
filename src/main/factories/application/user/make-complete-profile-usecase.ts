import { UseCase } from "../../../../application/@shared/usecase.shared";
import {
  CompleteProfileInputDto,
  CompleteProfileOutputDto,
} from "../../../../application/user/dtos/complete-profile.dto";
import { UserDto } from "../../../../application/user/dtos/user.dto";
import { CompleteProfileFailedError } from "../../../../application/user/errors/complete-profile-failed.error";
import { CompleteProfileUseCase } from "../../../../application/user/use-cases/complete-profile.usecase";
import { SafeUseCase } from "../../../decorators/safe-usecase.decorator";
import { makeUserRepository } from "../../infra/persistence/user/make-user-repository";

export function makeCompleteProfileUseCase(): UseCase<
  CompleteProfileInputDto,
  CompleteProfileOutputDto
> {
  const userRepository = makeUserRepository();
  const completeProfileUseCase = new CompleteProfileUseCase(userRepository);

  return new SafeUseCase<CompleteProfileInputDto, UserDto>(
    completeProfileUseCase,
    CompleteProfileFailedError,
  );
}
