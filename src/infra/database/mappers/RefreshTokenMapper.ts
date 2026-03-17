import { RefreshToken } from "../../../domain/entities";
import { RefreshTokenFormat, UniqueEntityId } from "../../../domain/value-objects";
import { IRefreshTokenDocument } from "../schemas";

export class RefreshTokenMapper {
  static toEntity(doc: IRefreshTokenDocument): RefreshToken {
    return new RefreshToken(
      UniqueEntityId.createId(doc._id.toString()),
      RefreshTokenFormat.create(doc.token),
      UniqueEntityId.createId(doc.userId.toString()),
      doc.expiresAt,
      doc.revoked ?? false,
    );
  }

  static toDocument(entity: RefreshToken) {
    return {
      token: entity.token.getValue(),
      userId: entity.userId.toString(),
      expiresAt: entity.expiresAt,
      revoked: entity.revoked,
    };
  }
}
