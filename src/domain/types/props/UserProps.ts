import { Email, Password } from "../../value-objects"

export type UserProps = {
    _name: string,
    _email: Email,
    _password: Password,
    _description: string,
    _activated: boolean,
}