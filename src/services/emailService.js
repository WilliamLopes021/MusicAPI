import transporter from "../config/mailConfig.js";
import { codeGenerator } from "../utils/codeGenerator.js";

const emailService = {
  async sendVerificationMail(to) {
    const code = codeGenerator();
    try {
      const sent = await transporter.sendMail({
        from: "MusicAPI",
        to: to,
        subject: `Código de verificação- MusicAPI`,
        html: `<h1> Código de verificação para criação de conta: ${code}</h1>`,
      });

      if (sent.accepted.length > 0) {
        return { code };
      }

      return null;
    } catch (e) {
      throw e;
    }
  },
};

export default emailService;
