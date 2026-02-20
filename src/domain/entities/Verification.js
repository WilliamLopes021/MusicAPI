import mongoose, { Schema } from "mongoose";

const verificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  payload: { type: Schema.Types.Mixed },
  code: String,
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 },
  },
});

verificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Verification = mongoose.model("Verification", verificationSchema);

export default Verification;
