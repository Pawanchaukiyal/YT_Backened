// require('dotenv').config({path:'./env'}) // you can only use this and
// other way is import but here you add some extra (-r dotenv/config -- experimental-json-modules) this bracket data add in dev in package
import dotenv from "dotenv"; // it not work isko firdst config krna hoga

import connectDB from "./db/index.js";
import { app } from "./app.js";

// config kr raha hu
dotenv.config({
  path: "./.env",
});

connectDB() // piche express kam karega
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connection failed!!!", err);
  });

// import mongoose from "mongoose";
// import {DB_NAME} from "./constants";
// // first approch --if'

// import express from "express";
// const app =express();
// ( async () => {
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",(error)=>{
//          console.log("ERRR: ",error);
//          throw error
//         })

//      app.listen(process.env.PORT,()=>{
//       console.log(`App is listening on port ${process.env.PORT}`)
//      })

//     } catch (error) {
//         console.log("Error connecting to the db:", error)
//         throw err
//     }
// })()
