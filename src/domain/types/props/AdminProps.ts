import { Email, Password } from "../../value-objects";
import { AdminRoles } from "../AdminRoles";

export type AdminProps = {
    readonly name: string,
    readonly email: Email,
    readonly password: Password,
    readonly role: AdminRoles,
}