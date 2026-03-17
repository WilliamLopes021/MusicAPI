import { Administrator } from "../../../domain/entities";
import { AdminRoles } from "../../../domain/types";
import { Email, Password, UniqueEntityId } from "../../../domain/value-objects";
import { IAdministratorDocument } from "../schemas";

export class AdministratorMapper {
  static toEntity(doc: IAdministratorDocument): Administrator {
    return new Administrator({
      name: doc.name,
      email: Email.createEmail(doc.email),
      password: Password.createPassword(doc.password),
      role: doc.role as AdminRoles,
    });
  }

  static toDocument(entity: Administrator) {
    return {
      name: entity.name,
      email: entity.email,
      password: entity.password.getValue(),
      role: entity.role,
    };
  }
}
