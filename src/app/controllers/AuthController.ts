import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService, RefreshTokenService } from "../../domain/services";
const userService = new UserService();
const refreshTokenService = new RefreshTokenService();

const JWT_SECRET = (process.env.JWT_SECRET || "secret") as string;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "15m") as string;

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await userService.findByEmail(email);
      if (!user || !(await userService.comparePassword(password, user.password))) {
        res.status(401).json({ message: "Credenciais inválidas" });
        return;
      }
      const token = jwt.sign(
        { userId: user._id.toString(), email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
      );
      const refreshToken = await refreshTokenService.create(user._id.toString());
      res.json({
        accessToken: token,
        refreshToken: refreshToken.token,
        expiresIn: JWT_EXPIRES_IN,
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao fazer login", error });
    }
  }

  async refresh(req: Request, res: Response): Promise<void> {
    try {
      const token = req.body.refreshToken || req.cookies?.refreshToken;
      if (!token) {
        res.status(400).json({ message: "Refresh token não fornecido" });
        return;
      }
      const stored = await refreshTokenService.findByToken(token);
      if (!stored) {
        res.status(401).json({ message: "Refresh token inválido ou expirado" });
        return;
      }
      const populated = stored.userId as { _id: { toString(): string } };
      const userId = populated._id.toString();
      const newAccessToken = jwt.sign(
        { userId, email: "" },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
      );
      res.json({ accessToken: newAccessToken, expiresIn: JWT_EXPIRES_IN });
    } catch (error) {
      res.status(500).json({ message: "Erro ao renovar token", error });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const token = req.body.refreshToken || req.cookies?.refreshToken;
      if (token) {
        await refreshTokenService.revoke(token);
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao fazer logout", error });
    }
  }
}
