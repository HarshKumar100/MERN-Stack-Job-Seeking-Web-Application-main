import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI || "mongodb+srv://hk102004:20harsh2004@cluster0.xhurs.mongodb.net/", {
      dbName: "MERN_JOB_SEEKING_WEBAPP",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};
