import { UserRepository } from "@/modules/user/domain/repositories/UserRepository";

export class LoginUser {
  constructor(private userRepository: UserRepository) {}

  async run(email: string, password: string) {
    await this.userRepository.login({ email, password });
  }
}
