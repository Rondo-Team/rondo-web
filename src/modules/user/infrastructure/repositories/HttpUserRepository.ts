import { ServerHttpClient } from "@/api/http/client/ServerHttpClient";
import { UserRepository } from "@/modules/user/domain/repositories/UserRepository";
import { LoginUserRequestDTO } from "@/modules/user/infrastructure/dtos/LoginUserRequestDTO";
import { LoginUserResponseDTO } from "@/modules/user/infrastructure/dtos/LoginUserResponseDTO";

export class HttpUserRepository implements UserRepository {
  async login(req: LoginUserRequestDTO) {
    const client = new ServerHttpClient();
    await client.post<LoginUserResponseDTO, LoginUserRequestDTO>(
      "/api/v1/users/login",
      req,
    );
  }
}
