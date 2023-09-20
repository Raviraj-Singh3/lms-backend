import express from "express";
import { authRouter } from "./router/authRouter.js";
const app = express();

app.use(express.json());

app.use('/api/auth/', authRouter)

app.use('/', (req, res)=>{
    res.status(200).json({data: 'auth server'});
})

export default app;