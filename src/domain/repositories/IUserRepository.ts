import { User } from "../entities";

export interface IUserRepository {
  save(data: User): Promise<User>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>
}
