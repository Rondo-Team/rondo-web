import { Token } from "@/modules/shared/domain/Token";
import { userNavBarInfoFromUserProfileMapper } from "@/modules/user/application/mappers/userNavBarInfoFromUserProfileMapper";
import type { UserRepository } from "@/modules/user/domain/repositories/UserRepository";
import { inject } from "inversify";

export class GetUserNavBarInfo {
  constructor(
    @inject(Token.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async run() {
    const userInfo = await this.userRepository.me();
    return userNavBarInfoFromUserProfileMapper(userInfo);
  }
}
