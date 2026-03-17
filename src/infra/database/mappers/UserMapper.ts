import { User } from "../../../domain/entities";
import { Email, Password, UniqueEntityId } from "../../../domain/value-objects";
import { IUserDocument } from "../schemas";

export class UserMapper {
  static toEntity(doc: IUserDocument): User {
    return new User(
      UniqueEntityId.createId(doc._id.toString()),
      doc.name,
      Email.createEmail(doc.email),
      Password.createPassword(doc.password),
      doc.description,
      doc.activated
    );
  }

  static toDocument(entity: User) {
    return {
      name: entity.name,
      email: entity.email.getValue(),
      password: entity.password,
      description: entity.description,
      activated: entity.activated
    };
  }
}
