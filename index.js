// import express from "express";
import app from "./src/app.js";

const PORT = 5001;
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})