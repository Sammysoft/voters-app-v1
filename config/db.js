import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGOURI } = process.env

export const initDB = ()=>{
    console.log(`Initializing database...`)
    mongoose.connect(MONGOURI).then((res)=>{
        if(res) console.log(`Database connected successfully...`);
    }).catch((error)=>{
         console.log(`Connection error, ${error}`);
    })
}