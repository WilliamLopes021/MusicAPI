export interface EmailProvider {
  sendActivationAccountMail(email: string, activationLink: string): Promise<void>;
  sendRecoveryPasswordMail(email: string, recoveryCode: number): Promise<void>;
}
