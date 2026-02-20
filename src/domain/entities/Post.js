import mongoose, { Schema } from "mongoose";

export const flagTypes = [
  "Violão",
  "Saxofone",
  "Didático",
  "Clássico",
  "Popular",
  "Erudito",
  "Guitarra",
];

const postSchema = new Schema(
  {
    thumb: { type: String, default: null },
    video: { type: String, default: null },
    title: { type: String, required: true, maxlength: 50 },
    description: { type: String, required: true, default: `` },
    flags: [{ type: String, enum: flagTypes }],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
