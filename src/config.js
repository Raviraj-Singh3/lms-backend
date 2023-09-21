import mongoose from "mongoose";

const DB_URL =  process.env.MONGO_URL ||'mongodb://localhost:27017';

mongoose.set('strictQuery', false);

const dbConnect = async () =>{
    try {
        const connt = await mongoose.connect(DB_URL);
        console.log(`connected::${connt.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    
}

export default dbConnect;