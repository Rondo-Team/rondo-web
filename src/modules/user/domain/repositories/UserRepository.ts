import { UserProfile } from "@/modules/user/domain/value-objects/UserProfile";
import { LoginUserRequestDTO } from "@/modules/user/infrastructure/dtos/LoginUserRequestDTO";
import { RegisterUserRequestDTO } from "@/modules/user/infrastructure/dtos/RegisterUserRequestDTO";

export interface UserRepository {
  login: (req: LoginUserRequestDTO) => Promise<void>;
  register: (req: RegisterUserRequestDTO) => Promise<void>;
  me: () => Promise<UserProfile>;
}
