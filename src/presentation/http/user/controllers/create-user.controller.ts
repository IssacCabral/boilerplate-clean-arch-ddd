import { IError } from "../../../../@shared/error.shared";
import { UseCase } from "../../../../application/@shared/usecase.shared";
import {
  CreateUserInputDto,
  CreateUserOutputDto,
} from "../../../../application/user/dtos/create-user.dto";
import { UserDto } from "../../../../application/user/dtos/user.dto";
import { Controller } from "../../@shared/controller";
import {
  applicationError,
  badRequest,
  created,
  HttpRequest,
  HttpResponse,
} from "../../@shared/http";
import { makeValidationError } from "../../@shared/validation-error";
import { createUserSchema } from "../validators/create-user.schema";

export class CreateUserController implements Controller<
  HttpRequest,
  UserDto | IError
> {
  constructor(
    private readonly createUserUseCase: UseCase<
      CreateUserInputDto,
      CreateUserOutputDto
    >,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<UserDto | IError>> {
    const parsedRequest = createUserSchema.safeParse(request);

    if (!parsedRequest.success) {
      return badRequest(makeValidationError(parsedRequest.error));
    }

    const result = await this.createUserUseCase.exec(parsedRequest.data.body);

    if (result.isLeft()) {
      return applicationError(result.value);
    }

    return created(result.value);
  }
}
