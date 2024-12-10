import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.v5a80.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;`

export const connectionDB = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("connect"))
    .catch((e) => console.log("not connect, Error:" .concat(e)));
};
   