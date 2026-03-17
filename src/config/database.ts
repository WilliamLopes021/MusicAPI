import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/dinoblog";
  await mongoose.connect(uri);
};
