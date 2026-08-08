import { right } from "../../../@shared/either.shared";
import { UserRepository } from "../../../domain/user/repositories/user.repository";
import { UseCase } from "../../@shared/usecase.shared";
import { ListUsersInputDto, ListUsersOutputDto } from "../dtos/list-users.dto";
import { UserDtoMapper } from "../dtos/user.dto";

export class ListUsersUseCase implements UseCase<
  ListUsersInputDto,
  ListUsersOutputDto
> {
  constructor(private readonly userRepository: UserRepository) {}

  async exec(input: ListUsersInputDto): Promise<ListUsersOutputDto> {
    const users = await this.userRepository.list({
      where: {
        page: input.page,
        perPage: input.perPage,
        searchValue: input.searchValue,
        status: input.status,
      },
    });
    return right(UserDtoMapper.toPaginationDto(users));
  }
}
