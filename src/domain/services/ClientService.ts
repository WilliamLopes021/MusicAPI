import { Administrator, User } from "../entities";
import { IUserRepository, IAdministratorRepository } from "../repositories";
import { Email } from "../value-objects";

export class ClientService {
  constructor(
    private userRepository: IUserRepository,
    private adminRepository: IAdministratorRepository,
  ){}

  async findUser(email: Email): Promise<User | Administrator | null>{
    const client = await this.userRepository.findByEmail(email.toString());
    if(client) return client;

    const admin = await this.adminRepository.findByEmail(email.toString());
    if(admin) return admin;

    return null;
  }
}