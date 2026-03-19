import { IEmailProvider } from "../providers";
import { Validation } from "../entities";
import { IUserRepository, IValidationRepository } from "../repositories";
import { Email, UniqueEntityId } from "../value-objects";

export class ValidationService {
  constructor(
    private userRepo: IUserRepository,
    private validationRepo: IValidationRepository,
    private emailProvider: IEmailProvider,
  ) {}

  async generatePasswordRecoveryToken(email: Email): Promise<any> {
    const userEmail = email.toString();

    const user = await this.userRepo.findByEmail(userEmail);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const code = Validation.generateCode();
    const validation = new Validation({
      type: "recovery-password",
      _expiresAt: new Date(Date.now() + 10 * 60 * 60 * 1000),
      used: false,
      userId: user._id!,
      _code: code
    });

    const validationToken = await this.validationRepo.save(validation);
  }

  async generateActivateAccountToken(id: UniqueEntityId): Promise<void> {}
}
