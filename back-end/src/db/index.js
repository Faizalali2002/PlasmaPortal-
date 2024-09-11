import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `\n MongoDB connected !! DB HOST: ${connection.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
  }
};

export default connectDB;
