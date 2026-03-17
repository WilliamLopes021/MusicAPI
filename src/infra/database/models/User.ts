import mongoose from "mongoose";
import { UserSchema, IUserDocument } from "../schemas";

export default mongoose.model<IUserDocument>("User", UserSchema);
