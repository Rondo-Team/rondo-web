export interface AuthRepository {
  refreshToken: () => Promise<void>;
}
