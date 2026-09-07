import { Either, left, right } from "../../../@shared/either.shared";
import {
  CreateUserInputDto,
  CreateUserOutputDto,
} from "../dtos/create-user.dto";
import { IError } from "../../../@shared/error.shared";
import { UseCase } from "../../@shared/usecase.shared";
import { UserRepository } from "../../../domain/user/repositories/user.repository";
import { UserAlreadyExists } from "../errors/user-already-exists.error";
import { UserEntity } from "../../../domain/user/entities/user.entity";
import { Email } from "../../../domain/user/value-objects/email.vo";
import { PasswordHash } from "../../../domain/user/value-objects/password-hash.vo";
import { Password } from "../../../domain/user/value-objects/password.vo";
import { RoleRepository } from "../../../domain/access-control/role/repositories/role.repository";
import { RoleNotFoundError } from "../../access-control/role/errors/role-not-found.error";
import { UserDtoMapper } from "../dtos/user.dto";
import { PasswordHasher } from "../../ports/cryptography/password-hasher.port";

export class CreateUserUseCase implements UseCase<
  CreateUserInputDto,
  CreateUserOutputDto
> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly roleRepository: RoleRepository,
  ) {}

  async exec(input: CreateUserInputDto): Promise<CreateUserOutputDto> {
    const userData = this.buildCreateUserData(input);
    if (userData.isLeft()) {
      return left(userData.value);
    }

    const role = await this.roleRepository.findById(input.roleId);
    if (!role) {
      return left(RoleNotFoundError);
    }

    const existingUser = await this.userRepository.findByEmail(
      userData.value.email,
    );
    if (existingUser) {
      return left(UserAlreadyExists);
    }

    const hashedPassword = this.passwordHasher.hash(
      userData.value.password.getValue(),
    );
    const passwordHash = PasswordHash.create(hashedPassword);
    if (passwordHash.isLeft()) {
      return left(passwordHash.value);
    }

    const user = UserEntity.create({
      id: Math.random().toString(36).substring(2, 15).toString(),
      email: userData.value.email,
      passwordHash: passwordHash.value,
      role: role.export(),
    });

    await this.userRepository.create(user);

    return right(UserDtoMapper.toDto(user));
  }

  private buildCreateUserData(input: CreateUserInputDto): Either<
    IError,
    {
      email: Email;
      password: Password;
    }
  > {
    const email = Email.create(input.email);
    if (email.isLeft()) {
      return left(email.value);
    }

    const password = Password.create(input.password);
    if (password.isLeft()) {
      return left(password.value);
    }

    return right({
      email: email.value,
      password: password.value,
    });
  }
}
