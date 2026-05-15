import mongoose from "mongoose";



const connectDB = async () => {
  try {
    const isDeployment = process.env.NODE_ENV === "deployment";
    const mongoUri = isDeployment ? process.env.PROD_MONGO_URI : process.env.LOCAL_MONGO_URI;
    
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;