import { Token } from "@/modules/shared/domain/Token";
import type { UserRepository } from "@/modules/user/domain/repositories/UserRepository";
import { inject } from "inversify";

export class LoginUser {
  constructor(
    @inject(Token.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async run(email: string, password: string) {
    await this.userRepository.login({ email, password });
  }
}
