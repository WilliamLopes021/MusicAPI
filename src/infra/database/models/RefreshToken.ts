import mongoose from "mongoose";
import { RefreshTokenSchema, IRefreshTokenDocument } from "../schemas";

export default mongoose.model<IRefreshTokenDocument>("RefreshToken", RefreshTokenSchema);
