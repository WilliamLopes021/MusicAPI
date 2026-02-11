import mongoose, { Schema } from "mongoose";


export const flagTypes = [
  "Violão",
  "Saxofone",
  "Didático",
  "Clássico",
  "Popular",
  "Erudito",
];

const postSchema = new Schema(
  {
    thumb: { type: String, default: null },
    video: { type: String, default: null },
    title: { type: String, required: true, maxlength: 50 },
    description: { type: String, required: true, maxlength: 255, default: `` },
    flags: { type: String, enum: flagTypes },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        body: {
          type: String,
          maxLength: 255,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
