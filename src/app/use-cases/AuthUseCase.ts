import { ITokenProvider } from "../../domain/providers/tokenProvider";
import { IHashProvider } from "../../domain/providers/hashProvider";
import { UniqueEntityId } from "../../domain/value-objects";
import { IUserRepository } from "../../domain/repositories";

export class AuthService {
    constructor(
      private userRepository: IUserRepository,
      private hashProvider: IHashProvider,
      private tokenProvider: ITokenProvider
    ) {}
    
    async login(email: string, password: string) {
      const user = await this.userRepository
    }
    async logout(refreshId: UniqueEntityId){}
    async refresh(refreshId: UniqueEntityId){}
  }