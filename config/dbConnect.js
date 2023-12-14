import mongoose from "mongoose";

const dbConnect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected")
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
