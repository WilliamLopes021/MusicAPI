import { Validation } from "../../../domain/entities";
import { UniqueEntityId } from "../../../domain/value-objects";
import { IValidationDocument } from "../schemas";
import { TokenTypes } from "../../../domain/types";

export class ValidationMapper {
  static toEntity(doc: IValidationDocument): Validation {
    return new Validation({
      _expiresAt: doc.expiresAt,
      type: doc.type as TokenTypes,
      used: doc.used,
      userId: UniqueEntityId.create(doc.userId.toString()),
      _code: doc.code,
    });
  }

  static toDocument(entity: Validation) {
    return {
      userId: entity.userId.toString(),
      type: entity.type,
      code: entity?.code,
      expiresAt: entity.expiresAt,
      used: entity.used,
    };
  }
}
