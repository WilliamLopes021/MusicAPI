import { ITokenProvider } from "../../domain/providers/tokenProvider";
import { randomBytes } from "node:crypto";
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

  generateRawToken(): string {
    return randomBytes(40).toString("hex");
  }
}
