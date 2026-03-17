import { ValidationModel } from "../models";
import { Validation } from "../../../domain/entities";
import { ValidationMapper } from "../mappers";
import { IValidationRepository } from "../../../domain/repositories";

export class ValidationRepository implements IValidationRepository {
  async save(data: Validation): Promise<Validation> {
    const document = ValidationMapper.toDocument(data);

    const doc = await ValidationModel.findByIdAndUpdate(
      data.id.getValue(),
      document,
      { new: true, upsert: true }
    );

    return ValidationMapper.toEntity(doc);
  }

  async delete(id: string): Promise<void> {
    await ValidationModel.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<Validation | null> {
    const doc = await ValidationModel.findById(id);
    if (!doc) return null;

    return ValidationMapper.toEntity(doc);
  }

  async findByUserId(id: string): Promise<Validation | null> {
    const doc = await ValidationModel.findOne({ userId: id });
    if (!doc) return null;

    return ValidationMapper.toEntity(doc);
  }
}
