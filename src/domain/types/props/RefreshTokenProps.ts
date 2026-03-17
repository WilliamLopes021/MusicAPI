import { UniqueEntityId, RefreshTokenFormat } from "../../value-objects";

export type RefreshTokenProps = {
  readonly token: RefreshTokenFormat;
  readonly userId: UniqueEntityId;
  _expiresAt: Date;
  revoked: boolean;
};
