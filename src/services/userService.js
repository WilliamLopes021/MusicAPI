import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { generateToken } from "../utils/refreshUtils.js";
import UserRepository from "../repositories/userRepository.js";
import RefreshRepository from "../repositories/RefreshRepository.js";
import emailService from "./emailService.js";
import generalValidator from "../utils/userValidator.js";
import AppError from "../error/AppError.js";

config();

const userService = {
  async create(body) {
    const entries = Object.entries(body);
    const reference = Object.keys(generalValidator);

    if (entries.length !== reference.length) {
      throw new Error("Entrada de dados incompleta.", 400);
    }

    for (let value of entries) {
      const [key, val] = value;
      const fn = generalValidator[key];
      if (!fn(val)) throw new AppError(`Dado inválido no campo ${key}`, 400);
    }

    const user = await UserRepository.show({ email: body.email });

    if (user) throw new AppError("E-mail já cadastrado.", 400);

    const passwordHash = await bcrypt.hash(body.password, 12);

    const { name, email } = body;
    const { code } = await emailService.sendVerificationMail(email);

    const newUser = await UserRepository.create({
      name,
      email,
      data_nasc: body.dataNasc,
      password: passwordHash,
    });

    const payload = {
      id: newUser._id,
      code,
      type: "ativacao",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "6m",
    });

    return { success: true, token };
  },

  async validateCode(body, token) {
    if (!token?.code) {
      throw new AppError(`Usuário não autenticado.`, 401);
    }

    if (!body.code || typeof body.code !== "number") {
      throw new AppError(`Código inválido`, 400);
    }

    if (body.code === token.code) {
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
      });

      await refreshToken.populate({
        path: "userInfo",
        select: "_id email",
      });

      return { activeUser, acessToken, refreshToken };
    }

    throw new AppError(`Código errado.`, 400);
  },

  async update(id, body) {
    if (!id || typeof id !== "string") {
      throw new AppError("ID inválido.", 400);
    }

    const user = await UserRepository.show({ _id: id });

    if (!user || !user.isActive) {
      throw new AppError("Usuário inválido.", 400);
    }

    for (let value of Object.entries(body)) {
      const [key, val] = value;
      const fn = generalValidator[key];
      if (!fn(val)) throw new AppError(`Dado inválido no campo ${key}`, 400);
    }

    user.set(body);

    await user.save();
    return user;
  },

  async show(id) {
    if (!id || typeof id !== "string") {
      throw new AppError("ID inválido.", 400);
    }

    const user = await UserRepository.show({ _id: id });

    if (!user || !user.isActive) {
      throw new AppError("Usuário inválido.", 400);
    }

    return user;
  },

  async destroy(id) {
    if (!id || typeof id !== "string") {
      throw new AppError("Usuário inválido.", 400);
    }

    const user = await UserRepository.show({ id: id });

    if (!user || !user.isActive) {
      throw new AppError("Usuário inválido.", 400);
    }

    const refreshDeleted = await RefreshRepository.destroy({ userId: id });

    if (!refreshDeleted)
      throw new AppError("Erro ao deletar Refresh Token.", 500);

    await user.deleteOne();
    return { success: true };
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
};

export default userService;
