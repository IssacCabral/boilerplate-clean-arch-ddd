import { IError } from "../../../../@shared/error.shared";
import { PaginationData } from "../../../../@shared/pagination.shared";
import { UseCase } from "../../../../application/@shared/usecase.shared";
import {
  ListUsersInputDto,
  ListUsersOutputDto,
} from "../../../../application/user/dtos/list-users.dto";
import { UserDto } from "../../../../application/user/dtos/user.dto";
import { Controller } from "../../@shared/controller";
import {
  applicationError,
  badRequest,
  HttpRequest,
  HttpResponse,
  ok,
} from "../../@shared/http";
import { makeValidationError } from "../../@shared/validation-error";
import { listUsersSchema } from "../validators/list-users.schema";

export class ListUsersController implements Controller<
  HttpRequest,
  PaginationData<UserDto> | IError
> {
  constructor(
    private readonly listUsersUseCase: UseCase<
      ListUsersInputDto,
      ListUsersOutputDto
    >,
  ) {}

  async handle(
    request: HttpRequest,
  ): Promise<HttpResponse<PaginationData<UserDto> | IError>> {
    const parsedRequest = listUsersSchema.safeParse(request);
    if (!parsedRequest.success) {
      return badRequest(makeValidationError(parsedRequest.error));
    }

    const result = await this.listUsersUseCase.exec(parsedRequest.data.query);

    if (result.isLeft()) {
      return applicationError(result.value);
    }

    return ok(result.value);
  }
}
