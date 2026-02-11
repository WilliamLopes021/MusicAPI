import val from "validator";

const validationRules = {
  name: (v) => typeof v === "string" && v.trim().length > 0,
  email: (v) => val.isEmail(v),
  password: (v) =>
    val.isStrongPassword(v, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  dataNasc: (v) => val.isDate(v) && new Date(v) < new Date(),
};

export default validationRules;
