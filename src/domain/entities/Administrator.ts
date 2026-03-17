import { Email, Password, UniqueEntityId } from "../value-objects";
import { AdminRoles } from "../types/AdminRoles";

export class Administrator {
  constructor(
    public readonly id: UniqueEntityId,
    public email: Email,
    public password: Password,
    public readonly role: AdminRoles,
  ) {}

}
