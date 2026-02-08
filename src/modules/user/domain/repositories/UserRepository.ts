import { LoginUserRequestDTO } from "@/modules/user/infrastructure/dtos/LoginUserRequestDTO";

export interface UserRepository {
  login: (req: LoginUserRequestDTO) => Promise<void>;
}
