import { RefreshTokenProps } from "../types/props/RefreshTokenProps";
import { UniqueEntityId, RefreshTokenFormat } from "../value-objects";

export class RefreshToken {
  constructor(
    private props: RefreshTokenProps,
    public readonly id?: UniqueEntityId,
  ) {}

  revoke(): void{
    if(this.props.revoked) throw new Error('Token já está inválido.')
    this.props.revoked = true;
  }

  set expiresAt(date: Date) {
    if (date < new Date()) {
      throw new Error("Data inválida.");
    }

    this.props._expiresAt = date;
  }

  get expiresAt(): Date {
    return this.props._expiresAt;
  }
}
