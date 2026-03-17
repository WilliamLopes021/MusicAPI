import { EmailProvider } from "../providers/emailProvider";
import { IValidationRepository } from "../repositories";

export class ValidationService {
  constructor(
    private validationRepo: IValidationRepository,
    private emailProvider: EmailProvider
  ){}

}