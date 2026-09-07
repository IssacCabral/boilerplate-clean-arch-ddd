import { PaginationData } from "../../../../@shared/pagination.shared";
import { UseCase } from "../../../../application/@shared/usecase.shared";
import {
  ListUsersInputDto,
  ListUsersOutputDto,
} from "../../../../application/user/dtos/list-users.dto";
import { UserDto } from "../../../../application/user/dtos/user.dto";
import { ListUsersFailedError } from "../../../../application/user/errors/list-users-failed.error";
import { ListUsersUseCase } from "../../../../application/user/use-cases/list-users.usecase";
import { SafeUseCase } from "../../../decorators/safe-usecase.decorator";
import { makeUserRepository } from "../../infra/persistence/user/make-user-repository";

export function makeListUsersUseCase(): UseCase<
  ListUsersInputDto,
  ListUsersOutputDto
> {
  const userRepository = makeUserRepository();
  const listUsersUseCase = new ListUsersUseCase(userRepository);

  return new SafeUseCase<ListUsersInputDto, PaginationData<UserDto>>(
    listUsersUseCase,
    ListUsersFailedError,
  );
}
