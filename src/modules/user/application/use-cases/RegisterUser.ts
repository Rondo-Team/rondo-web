import { Token } from "@/modules/shared/domain/Token";
import type { UserRepository } from "@/modules/user/domain/repositories/UserRepository";
import { inject } from "inversify";

export class RegisterUser {
  constructor(
    @inject(Token.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async run(
    id: string,
    name: string,
    username: string,
    email: string,
    password: string,
  ) {
    await this.userRepository.register({ id, name, username, email, password });
  }
}
