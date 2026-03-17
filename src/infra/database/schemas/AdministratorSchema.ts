import mongoose, { Schema, Types } from "mongoose";

export interface IAdministratorDocument {
  _id: Types.ObjectId;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export const AdministratorSchema = new Schema<IAdministratorDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "admin" },
  },
  { timestamps: true },
);
