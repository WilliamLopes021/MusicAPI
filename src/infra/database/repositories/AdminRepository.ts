import { AdministratorModel } from "../models";
import { Administrator } from "../../../domain/entities";
import { AdministratorMapper } from "../mappers/AdministratorMapper";
import { IAdministratorRepository } from "../../../domain/repositories";

export class AdminRepository implements IAdministratorRepository {
  async save(admin: Administrator): Promise<Administrator> {
    const data = AdministratorMapper.toDocument(admin);

    const doc = await AdministratorModel.findByIdAndUpdate(
      admin.id,
      data,
      { new: true, upsert: true }
    )

    return AdministratorMapper.toEntity(doc);
  }
  
  async delete(id: string): Promise<void> {
    await AdministratorModel.findByIdAndDelete(id); 
  }
  
  async findById(id: string): Promise<Administrator | null> {
    const doc = await AdministratorModel.findById(id);
    if(!doc) return null;

    return AdministratorMapper.toEntity(doc);

  }

    async findByEmail(email: string): Promise<Administrator | null> {
      const doc = await AdministratorModel.findOne({email: email});
      if (!doc) return null;
  
      return AdministratorMapper.toEntity(doc);
    }
}
