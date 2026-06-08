import { serverHttpClient } from "@/api/http/client/ServerHttpClient";
import { AuthRepository } from "@/modules/auth/domain/repositories/AuthRepository";
import { RefreshTokenResponseDTO } from "@/modules/auth/infrastructure/dtos/RefreshTokenResponseDTO";

export class HttpAuthRepository implements AuthRepository {
  async refreshToken() {
    await serverHttpClient.post<RefreshTokenResponseDTO>(
      "/api/v1/refresh-token",
    );
  }
}
