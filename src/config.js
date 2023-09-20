import mongoose from "mongoose";

const DB_URL =  process.env.MONGO_URL ||'mongodb://localhost:27017';

const dbConnect = async () =>{
    try {
        const connt = await mongoose.connect(DB_URL)
        console.log(`conn::${connt.connection.host}`)
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
    
}

export default dbConnect;