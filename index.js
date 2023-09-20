// import express from "express";
import app from "./src/app.js";
import 'dotenv/config'

const PORT = process.env.PORT || 5001;
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})