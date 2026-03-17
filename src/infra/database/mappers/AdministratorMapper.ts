import { Administrator } from "../../../domain/entities";
import { AdminRoles } from "../../../domain/types";
import { Email, Password, UniqueEntityId } from "../../../domain/value-objects";
import { IAdministratorDocument } from "../schemas";

export class AdministratorMapper {
  static toEntity(doc: IAdministratorDocument): Administrator {
    return new Administrator(
      UniqueEntityId.createId(doc._id.toString()),
      Email.createEmail(doc.email),
      Password.createPassword(doc.password),
      doc.role as AdminRoles,
    );
  }

  static toDocument(entity: Administrator) {
    return {
        email: entity.id.getValue(),
        password: entity.password.getValue(),
        role: entity.role,
    }
  }
}
