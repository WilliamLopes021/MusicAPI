import { User } from "../../../domain/entities";
import { Email, Password, UniqueEntityId } from "../../../domain/value-objects";
import { IUserDocument } from "../schemas";

export class UserMapper {
  static toEntity(doc: IUserDocument): User {
    return new User(
      {
        _name: doc.name,
        _activated: doc.activated,
        _description: doc.description,
        _email: Email.createEmail(doc.email),
        _password: Password.createPassword(doc.password),
      },
      UniqueEntityId.create(doc._id.toString()),
    );
  }

  static toDocument(entity: User) {
    return {
      name: entity.name,
      email: entity.email.getValue(),
      password: entity.password,
      description: entity.description,
      activated: entity.activated,
    };
  }
}
