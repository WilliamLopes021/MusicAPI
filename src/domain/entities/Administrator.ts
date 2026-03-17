import { AdminRoles } from "../types/AdminRoles";
import { UniqueEntityId, Email, Password } from "../value-objects";
import { AdminProps } from "../types/props/AdminProps";

export class Administrator {
  constructor(
    private readonly props: AdminProps,
    public readonly id?: UniqueEntityId,
  ) {}

  get name(): string {
    return this.props.name;
  }

  get email(): Email {
    return this.props.email;
  }

  get password(): Password {
    return this.props.password;
  }

  get role(): AdminRoles {
    return this.props.role;
  }
}
