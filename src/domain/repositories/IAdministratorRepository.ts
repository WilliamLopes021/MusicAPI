import { Administrator } from "../entities";

export interface IAdministratorRepository {
  save(data: Administrator): Promise<Administrator>;
  findById(id: string): Promise<Administrator | null>;
  delete(id: string): Promise<void>;
  findByEmail(email:string): Promise<Administrator | null>
}
