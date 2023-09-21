import 'dotenv/config'

import app from "./src/app.js";
import dbConnect from './src/config.js';

const PORT = process.env.PORT || 5001;

app.listen(PORT, async()=>{
    await dbConnect();
    console.log(`server is running on ${PORT}`)
})