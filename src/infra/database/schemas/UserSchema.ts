import mongoose, { Schema } from "mongoose";

export interface IUserDocument {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  activated: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String},
    activated: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);
