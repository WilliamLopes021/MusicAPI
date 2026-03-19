import { RefreshToken } from "../entities";

export interface IRefreshTokenRepository {
  save(data: RefreshToken): Promise<RefreshToken>;
  delete(id: string): Promise<void>;
  deleteMany(obj: Partial<RefreshToken>): Promise<void>;
  findById(id: string): Promise<RefreshToken | null>;
  findByToken(token: string): Promise<RefreshToken | null>;
}
