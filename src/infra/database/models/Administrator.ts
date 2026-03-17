import mongoose from "mongoose";
import { AdministratorSchema, IAdministratorDocument } from "../schemas"; 

export default mongoose.model<IAdministratorDocument>("Administrator", AdministratorSchema);
