import mongoose from "mongoose";
import { ValidationSchema, IValidationDocument } from "../schemas";

export default mongoose.model<IValidationDocument>("Validation", ValidationSchema);
