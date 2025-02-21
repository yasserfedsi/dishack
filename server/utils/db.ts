import mongoose from "mongoose";
require("dotenv").config();

const dbUrl: string | undefined = process.env.MONGODB_URI;

const connectDB = async (): Promise<void> => {
  if (!dbUrl) {
    console.error("Database connection URL (DB_URL) is not set.");
    return;
  }

  try {
    const data = await mongoose.connect(dbUrl);
    console.log(`Database connected with ${data.connection.host}`);
  } catch (error: any) {
    console.error(`Database connection failed: ${error.message}`);
  }
};

export default connectDB;
