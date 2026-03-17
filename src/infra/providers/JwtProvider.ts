import { ITokenProvider } from "../../domain/providers/tokenProvider";
import jwt from "jsonwebtoken";

export class JwtProvider implements ITokenProvider {
  signToken(payload: unknown, type: string, expires: number): string {
    const token = jwt.sign(
      { ...payload!, type: type },
      process.env.JWT_SECRET!,
      {
        expiresIn: expires,
      },
    );

    return token;
  }
}
