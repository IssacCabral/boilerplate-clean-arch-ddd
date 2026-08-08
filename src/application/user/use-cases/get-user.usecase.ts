import { left, right } from "../../../@shared/either.shared";
import { UserRepository } from "../../../domain/user/repositories/user.repository";
import { UseCase } from "../../@shared/usecase.shared";
import { GetUserInputDto, GetUserOutputDto } from "../dtos/get-user.dto";
import { UserDtoMapper } from "../dtos/user.dto";
import { UserNotFoundError } from "../errors/user-not-found.error";

export class GetUserUseCase implements UseCase<
  GetUserInputDto,
  GetUserOutputDto
> {
  constructor(private readonly userRepository: UserRepository) {}

  async exec(input: GetUserInputDto): Promise<GetUserOutputDto> {
    const user = await this.userRepository.findById(input.id);
    if (!user) {
      return left(UserNotFoundError);
    }
    return right(UserDtoMapper.toDto(user));
  }
}
