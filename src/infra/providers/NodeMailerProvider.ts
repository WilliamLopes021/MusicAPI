import { EmailProvider } from "../../domain/providers/emailProvider";
import { transporter } from "../../config/mailConfig";
import { Email } from "../../domain/value-objects";
import { Options } from "nodemailer/lib/smtp-transport";

class NodeMailerProvider implements EmailProvider {
  async sendActivationAccountMail(
    email: string,
    activationLink: string,
  ): Promise<void> {
    Email.createEmail(email);

    const mailOptions: Options = {
      from: "gabrielwilliam234@gmail.com",
      to: email,
      subject: "Ativação de conta MusicBlog",
      html: `Clque no link a seguir para ativar a sua conta: ${activationLink}`,
    };

    await transporter.sendMail(mailOptions);
  }
  async sendRecoveryPasswordMail(email: string, recoveryCode: number): Promise<void> {
    Email.createEmail(email);

    const mailOptions: Options = {
      from: "gabrielwilliam234@gmail.com",
      to: email,
      subject: "Recuperação de senha MusicBlog",
      html: `Código para redefinição de senha: ${recoveryCode}`,
    };

    await transporter.sendMail(mailOptions);
  }
}
