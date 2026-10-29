import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://yashlad:yash2118@ac-hkiw597-shard-00-00.dcrfqmn.mongodb.net:27017,ac-hkiw597-shard-00-01.dcrfqmn.mongodb.net:27017,ac-hkiw597-shard-00-02.dcrfqmn.mongodb.net:27017/food-app?ssl=true&replicaSet=atlas-13oj2z-shard-0&authSource=admin&appName=Cluster0"
    );

    console.log("Database Connected");
  } catch (error) {
    console.log("MongoDB Error:", error);
  }
};