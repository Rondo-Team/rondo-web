import { serverHttpClient } from "@/api/http/client/ServerHttpClient";
import { UserRepository } from "@/modules/user/domain/repositories/UserRepository";
import { LoginUserRequestDTO } from "@/modules/user/infrastructure/dtos/LoginUserRequestDTO";
import { LoginUserResponseDTO } from "@/modules/user/infrastructure/dtos/LoginUserResponseDTO";
import { RegisterUserRequestDTO } from "@/modules/user/infrastructure/dtos/RegisterUserRequestDTO";
import { RegisterUserResponseDTO } from "@/modules/user/infrastructure/dtos/RegisterUserResponseDTO";
import { UserProfileResponseDTO } from "@/modules/user/infrastructure/dtos/UserProfileResponseDTO";
import { getUserProfileMapper } from "@/modules/user/infrastructure/mappers/getUserProfileMapper";

export class HttpUserRepository implements UserRepository {
  async login(req: LoginUserRequestDTO) {
    await serverHttpClient.post<LoginUserResponseDTO, LoginUserRequestDTO>(
      "/api/v1/users/login",
      req,
    );
  }

  async register(req: RegisterUserRequestDTO) {
    await serverHttpClient.post<
      RegisterUserResponseDTO,
      RegisterUserRequestDTO
    >("/api/v1/users", req);
  }

  async me() {
    const result = await serverHttpClient.get<UserProfileResponseDTO>(
      "/api/v1/users/me/profile",
    );
    return getUserProfileMapper(result);
  }
}
