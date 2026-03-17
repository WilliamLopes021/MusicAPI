import { Validation } from "../entities";

export interface IValidationRepository {
  save(data: Validation): Promise<Validation>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Validation | null>;
  findByUserId(id: string): Promise<Validation | null>;
}
