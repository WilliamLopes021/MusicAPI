import { ITokenProvider } from "../../domain/providers/tokenProvider";
import { IHashProvider } from "../../domain/providers/hashProvider";
import {
  UniqueEntityId,
  Email,
  RefreshTokenFormat,
} from "../../domain/value-objects";
import {
  IRefreshTokenRepository,
  IUserRepository,
} from "../../domain/repositories";
import { RefreshToken } from "../../domain/entities";

export class AuthService {
  constructor(
    private userRepository: IUserRepository,
    private refreshRepo: IRefreshTokenRepository,
    private hashProvider: IHashProvider,
    private tokenProvider: ITokenProvider,
  ) {}

  async login(email: Email, password: string) {
    const user = await this.userRepository.findByEmail(email.toString());
    if (!user || !user._id) throw new Error("Usuário não encontrado");

    const equalPassword = this.hashProvider.comparePassword(
      password,
      user.password,
    );

    if (!equalPassword) throw new Error("Senha inválida.");

    const rawToken = this.tokenProvider.generateRawToken();
    const hashedToken = await this.hashProvider.hash(rawToken);

    const refresh = new RefreshToken({
      _expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      revoked: false,
      token: RefreshTokenFormat.create(hashedToken),
      userId: user._id,
    });

    await this.refreshRepo.deleteMany({ userId: user._id });

    const refreshToken = await this.refreshRepo.save(refresh);

    const expiresTime = 15 * 24 * 60 * 60 * 1000;
    const accessToken = this.tokenProvider.signToken(
      { id: user._id },
      "access",
      expiresTime,
    );

    return {
      accessToken,
      rawToken,
      refreshToken,
    };
  }

  async logout(refreshId: UniqueEntityId) {}
  async refresh(refreshId: UniqueEntityId) {}
}
