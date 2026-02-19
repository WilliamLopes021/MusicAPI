import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import RefreshRepository from "../repositories/RefreshRepository.js";
import UserRepository from "../repositories/userRepository.js";
import validator from "validator";
import AppError from "../error/AppError.js";
import { generateToken } from "../utils/refreshUtils.js";
import verificationService from "./verificationService.js";

const authService = {
  async login(body) {
    const { email, password } = body;

    if (!validator.isEmail(email)) {
      throw new AppError("E-mail inválido.", 400);
    }

    const user = await userRepository.show({ email });
    if (!user) throw new AppError("Usuário não encontrado.", 404);

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new AppError("Senha inválida.", 400);

    const payload = {
      id: user._id,
      email: user.email,
    };

    const acessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = await RefreshRepository.show({ userInfo: user._id });
    if (refreshToken) await refreshToken.deleteOne();

    const rawToken = generateToken();
    const hashedToken = await bcrypt.hash(rawToken, 10);

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
    const { success } = verificationService.compareCode(token?.code, body.code);

    if (success) {
      const activeUser = await UserRepository.update(
        { _id: token.id },
        { isActive: true },
      );

      const acessToken = jwt.sign(
        { id: activeUser._id, email: activeUser.email },
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
      type: "ativacao",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "6m",
    });

    return { success: true, token };
  },

  async refresh(token) {
    // const refreshToken = await
  },
};

export default authService;
