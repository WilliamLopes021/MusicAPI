import crypto from "node:crypto";

export function generateToken() {
  const result = crypto.randomBytes(13).toString("hex");
  return result;
}

