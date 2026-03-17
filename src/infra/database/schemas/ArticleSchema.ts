import mongoose, { Schema, Types } from "mongoose";

export interface IArticleDocument {
  _id: Types.ObjectId,
  title: string;
  content: string;
  authorId: mongoose.Types.ObjectId;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const ArticleSchema = new Schema<IArticleDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    available: { type: Boolean, default: false },
  },
  { timestamps: true }
);
