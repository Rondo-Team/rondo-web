import type { AuthRepository } from "@/modules/auth/domain/repositories/AuthRepository";
import { Token } from "@/modules/shared/domain/Token";
import { inject } from "inversify";

export class RefreshSession {
  constructor(
    @inject(Token.AUTH_REPOSITORY)
    private readonly authRepository: AuthRepository,
  ) {}

  async run() {
    await this.authRepository.refreshToken();
  }
}
