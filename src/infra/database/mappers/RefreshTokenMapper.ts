import { RefreshToken } from "../../../domain/entities";
import {
  RefreshTokenFormat,
  UniqueEntityId,
} from "../../../domain/value-objects";
import { IRefreshTokenDocument } from "../schemas";

export class RefreshTokenMapper {
  static toEntity(doc: IRefreshTokenDocument): RefreshToken {
    return new RefreshToken({
      token: RefreshTokenFormat.create(doc.token),
      userId: UniqueEntityId.create(doc.userId.toString()),
      _expiresAt: doc.expiresAt,
      revoked: doc.revoked ?? false,
    });
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
