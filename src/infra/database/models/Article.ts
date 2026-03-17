import mongoose from "mongoose";
import { ArticleSchema, IArticleDocument } from "../schemas";

export default mongoose.model<IArticleDocument>("Article", ArticleSchema);
