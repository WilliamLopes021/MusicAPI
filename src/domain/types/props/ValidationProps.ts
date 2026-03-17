import { UniqueEntityId } from "../../value-objects";
import { TokenTypes } from "../TokenTypes";

export type ValidationProps = {
  readonly userId: UniqueEntityId;
  readonly type: TokenTypes;
  _expiresAt: Date;
  used: boolean;
  _code?: number;
};
