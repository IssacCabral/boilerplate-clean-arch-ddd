import { Either, left } from "../../@shared/either.shared";
import { IError } from "../../@shared/error.shared";
import { UseCase } from "../../application/@shared/usecase.shared";

export class SafeUseCase<I, S> implements UseCase<I, Either<IError, S>> {
  constructor(
    private readonly useCase: UseCase<I, Either<IError, S>>,
    private readonly fallbackError: IError,
  ) {}

  async exec(input: I): Promise<Either<IError, S>> {
    try {
      return await this.useCase.exec(input);
    } catch (error) {
      console.error(error);
      return left(this.fallbackError);
    }
  }
}
