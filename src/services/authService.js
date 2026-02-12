import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import RefreshRepository from "../repositories/RefreshRepository";
import userRepository from "../repositories/userRepository";
import validator from "validator";
import AppError from "../error/AppError.js";
import { generateToken } from "../utils/refreshUtils.js";
import { config } from "dotenv";
import generalValidator from "../utils/userValidator.js";

config();

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
    await refreshToken.deleteOne();

    const rawToken = generateToken();
    const hashedToken = await bcrypt.hash(rawToken, 10);

    const newRefresh = await RefreshRepository.create({
      userInfo: user._id,
      token: hashedToken,
    });

    await newRefresh.populate({
      path: "userInfo",
      select: "_id email",
    });

    return { user, rawToken, acessToken };
  },

  async refresh(token) {
    // const refreshToken = await
  },
};

export default authService;
