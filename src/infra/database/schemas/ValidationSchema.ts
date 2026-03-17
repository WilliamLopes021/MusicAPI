import mongoose, { Schema, Types } from "mongoose";

export interface IValidationDocument {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  type: string;
  expiresAt: Date;
  code?: number;
  used: boolean;
  createdAt: Date;
}

export const ValidationSchema = new Schema<IValidationDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    code: { type: Number, required: false },
    type: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
);
