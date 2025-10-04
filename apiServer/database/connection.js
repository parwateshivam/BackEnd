import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({ path: "../config.env" })

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
  } catch (err) {
    console.log("database not connected", err)
  }
};

export default connectDB;
