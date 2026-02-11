import mongoose, { Schema } from "mongoose";

const refreshSchema = new Schema(
  {
    userInfo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// TTL index
refreshSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Refresh = mongoose.model("RefreshToken", refreshSchema);

export default Refresh;
