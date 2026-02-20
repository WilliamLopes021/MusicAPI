import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import RefreshRepository from "../repositories/RefreshRepository.js";
import UserRepository from "../repositories/userRepository.js";
import validator from "validator";
import AppError from "../error/AppError.js";
import { generateRefreshToken, hashToken } from "../utils/refreshUtils.js";
import verificationService from "./verificationService.js";
import VerificationRepository from "../repositories/VerificationRepository.js";

const authService = {
  async login(body) {
    const { email, password } = body;

    if (!validator.isEmail(email)) {
      throw new AppError("E-mail inválido.", 400);
    }

    const user = await UserRepository.show({ email });
    if (!user) throw new AppError("Usuário não encontrado.", 404);

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new AppError("Senha inválida.", 400);

    const payload = {
      id: user._id,
    };

    const acessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = await RefreshRepository.show({ userInfo: user._id });
    if (refreshToken) await refreshToken.deleteOne();

    const rawToken = generateRefreshToken();
    const hashedToken = hashToken(rawToken);

    const newRefresh = await RefreshRepository.create({
      userInfo: user._id,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await newRefresh.populate({
      path: "userInfo",
      select: "_id email",
    });

    return { user, rawToken, acessToken };
  },

  async activateAccount(body, token) {
    if (token?.type !== "activation") {
      throw new AppError("Token inválido.", 400);
    }

    const verification = await VerificationRepository.show({
      userId: token.id,
      type: "activation",
    });

    if (!verification) {
      throw new AppError("Token de ativação não encontrado.", 404);
    }

    const { success } = verificationService.compareCode(
      verification.code,
      body.code,
    );

    if (success) {
      const activeUser = await UserRepository.update(
        { _id: token.id },
        { isActive: true },
      );

      const acessToken = jwt.sign(
        { id: activeUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "15m",
        },
      );

      const rawToken = generateToken();
      const hashedToken = await bcrypt.hash(rawToken, 10);

      const refreshToken = await RefreshRepository.create({
        token: hashedToken,
        userInfo: activeUser._id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      await refreshToken.populate({
        path: "userInfo",
        select: "_id email",
      });

      return { activeUser, acessToken, refreshToken };
    }

    throw new AppError(`Código errado.`, 400);
  },

  async resendCode(body) {
    const { email } = body;

    if (!email || !validator.isEmail(email)) {
      throw new AppError(`E-mail inválido`, 400);
    }

    const user = await UserRepository.show({ email });

    if (!user) throw new AppError(`Usuário não encontrado`, 404);

    const { code } = await emailService.sendVerificationMail(email);

    const payload = {
      id: user._id,
      code,
      type: body.type || "activation",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "6m",
    });

    return { success: true, token };
  },

  async refresh(rawToken) {
    if (!rawToken) {
      throw new AppError("Token de refresh não enviado.", 400);
    }

    const hashedToken = hashToken(rawToken);
    const storedToken = await RefreshRepository.show({ token: hashedToken });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new AppError("Token de refresh inválido ou expirado.", 400);
    }

    const user = await UserRepository.show({ _id: storedToken.userInfo });
    if (!user) {
      throw new AppError(
        "Usuário associado ao token de refresh não encontrado.",
        404,
      );
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    return { success: true, accessToken, storedToken };
  },
};

export default authService;
