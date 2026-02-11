import AppError from "../error/AppError.js";

export default function validateString(value, name = "") {
  if (typeof value !== "string" || !value.trim()) {
    throw new AppError(`${name} inválido.`, 400);
  }
}

// value.trim() === ""
// !value.trim()
