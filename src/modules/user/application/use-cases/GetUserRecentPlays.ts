import { Token } from "@/modules/shared/domain/Token";
import { recentPlaysFromUserProfileMapper } from "@/modules/user/application/mappers/recentPlaysFromUserProfileMapper";
import type { UserRepository } from "@/modules/user/domain/repositories/UserRepository";
import { inject } from "inversify";

export class GetUserRecentPlays {
  constructor(
    @inject(Token.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async run() {
    const userProfile = await this.userRepository.me();
    return recentPlaysFromUserProfileMapper(userProfile);
  }
}
