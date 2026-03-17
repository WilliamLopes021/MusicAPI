import mongoose from "mongoose";
import { CommentSchema, ICommentDocument } from "../schemas";

export default mongoose.model<ICommentDocument>("Comment", CommentSchema);
