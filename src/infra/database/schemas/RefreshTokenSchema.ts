import mongoose, { Schema } from "mongoose";

export interface IRefreshTokenDocument {
  _id: mongoose.Types.ObjectId;
  token: string;
  userId: mongoose.Types.ObjectId;
  expiresAt: Date;
  revoked: boolean;
  createdAt: Date;
}

export const RefreshTokenSchema = new Schema<IRefreshTokenDocument>(
  {
    token: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expiresAt: { type: Date, required: true },
    revoked: { type: Boolean, default: false },
  },
  { timestamps: true }
);
