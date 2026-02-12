import crypto from "node:crypto";

export function generateToken() {
  return crypto.randomBytes.toString("hex");
}
