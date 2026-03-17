import { Validation } from "../../../domain/entities";
import { UniqueEntityId } from "../../../domain/value-objects";
import { IValidationDocument } from "../schemas";
import { TokenTypes } from "../../../domain/types";

export class ValidationMapper {
  static toEntity(doc: IValidationDocument): Validation {
    return new Validation(
      UniqueEntityId.createId(doc._id.toString()),
      UniqueEntityId.createId(doc.userId.toString()),
      doc.type as TokenTypes,
      doc.expiresAt,
      doc.used ?? false,
      doc.code,
    );
  }

  static toDocument(entity: Validation) {
    return {
      userId: entity.userId.toString(),
      type: entity.type,
      code: entity?.code,/*  */
      expiresAt: entity.expiresAt,
      used: entity.used,
    };
  }
}
