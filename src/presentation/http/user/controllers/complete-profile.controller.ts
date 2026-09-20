import { IError } from "../../../../@shared/error.shared";
import { UseCase } from "../../../../application/@shared/usecase.shared";
import {
  CompleteProfileInputDto,
  CompleteProfileOutputDto,
} from "../../../../application/user/dtos/complete-profile.dto";
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
import { completeProfileSchema } from "../validators/complete-profile.schema";

export class CompleteProfileController
  implements Controller<HttpRequest, UserDto | IError>
{
  constructor(
    private readonly completeProfileUseCase: UseCase<
      CompleteProfileInputDto,
      CompleteProfileOutputDto
    >,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<UserDto | IError>> {
    const parsedRequest = completeProfileSchema.safeParse(request);
    if (!parsedRequest.success) {
      return badRequest(makeValidationError(parsedRequest.error));
    }

    const result = await this.completeProfileUseCase.exec({
      id: parsedRequest.data.params.id,
      email: parsedRequest.data.body.email,
      phone: parsedRequest.data.body.phone,
      document: parsedRequest.data.body.document,
      name: parsedRequest.data.body.name,
    });

    if (result.isLeft()) {
      return applicationError(result.value);
    }

    return ok(result.value);
  }
}
