import mongoose, { Schema } from "mongoose";

export interface ICommentDocument {
  _id: mongoose.Types.ObjectId;
  content: string;
  articleId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const CommentSchema = new Schema<ICommentDocument>(
  {
    content: { type: String, required: true },
    articleId: { type: Schema.Types.ObjectId, ref: "Article", required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
