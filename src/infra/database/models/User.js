import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  photoUrl: { type: String, default: null },
  name: { type: String },
  email: {
    type: String,
    unique: true,
  },
  data_nasc: Date,
  password: String,
  isActive: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

export default User;
