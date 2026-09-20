import { IError } from "../../../../@shared/error.shared";
import { UseCase } from "../../../../application/@shared/usecase.shared";
import {
  GetUserInputDto,
  GetUserOutputDto,
} from "../../../../application/user/dtos/get-user.dto";
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
import { getUserSchema } from "../validators/get-user.schema";

export class GetUserController implements Controller<HttpRequest, UserDto | IError> {
  constructor(
    private readonly getUserUseCase: UseCase<GetUserInputDto, GetUserOutputDto>,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<UserDto | IError>> {
    const parsedRequest = getUserSchema.safeParse(request);
    if (!parsedRequest.success) {
      return badRequest(makeValidationError(parsedRequest.error));
    }

    const result = await this.getUserUseCase.exec({
      id: parsedRequest.data.params.id,
    });

    if (result.isLeft()) {
      return applicationError(result.value);
    }

    return ok(result.value);
  }
}
