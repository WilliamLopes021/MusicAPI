import bcrypt from "bcrypt";
import { IHashProvider } from "../../domain/providers/hashProvider";

export class BcryptProvider implements IHashProvider {
  async hash(plain: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(plain, salt);
    return hashedPassword;
  }

  async comparePassword(plain: string, hash: string): Promise<Boolean> {
    return await bcrypt.compare(plain, hash);
  }
}
