import { RefreshToken } from "../entities";
import { IHashProvider } from "../providers/hashProvider";
import { ITokenProvider } from "../providers/tokenProvider";
import { IRefreshTokenRepository } from "../repositories";
import { RefreshTokenFormat, UniqueEntityId } from "../value-objects";
import { randomBytes } from "node:crypto";

export class SessionService {
  constructor(
    private refreshTokenRepo: IRefreshTokenRepository,
    private tokenProvider: ITokenProvider,
  ) {}

  async refresh(rawToken: RefreshTokenFormat): Promise<any> {
    const token = await this.refreshTokenRepo.findByToken(rawToken.toString());
    if (!token) throw new Error("Token inválido.");

    const isExpired = token?.expiresAt <= new Date();

    if (isExpired || !token.revoked) throw new Error("Token expirado.");

    const expiresIn = 15 * 60 * 60 * 1000;
    const accessToken = this.tokenProvider.signToken(
      {
        id: token.userId,
      },
      "access",
      expiresIn,
    );
    return {
      accessToken,
      refreshToken: token,
    };
  }
}
/*
- Session - Cria a sessão com accesstoken e refreshToken
- Validation- Cria os registros dedicados a validação
- ClientService
- ArticleService
- CommentService
*/
