import { UniqueEntityId, RefreshTokenFormat } from "../value-objects";

export class RefreshToken {
  constructor(
    public readonly id: UniqueEntityId,
    public readonly token: RefreshTokenFormat,
    public readonly userId: UniqueEntityId,
    private _expiresAt: Date,
    public revoked: boolean = false,
  ) {}

  revoke(): void{
    if(this.revoked) throw new Error('Token já está inválido.')
    this.revoked = true;
  }

  set expiresAt(date: Date) {
    if (date < new Date()) {
      throw new Error("Data inválida.");
    }

    this._expiresAt = date;
  }

  get expiresAt(): Date {
    return this._expiresAt;
  }
}
