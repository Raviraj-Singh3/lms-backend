import express from "express";
import cors from 'cors';
import { authRouter } from "./router/authRouter.js";
import cookieParser from "cookie-parser";

const app = express();

// import dbConnect from "./config.js";
import morgan from "morgan";
import errorMiddleware from "./middlewares/error.middleware.js";

// dbConnect();

app.use(express.json());

app.use(cors({
    origin: [],
    credentials: true
}));

app.use(cookieParser());

app.use(morgan('dev'));


app.use('/ping', (req, res)=>{
    res.send('pong');
});

//
app.use('/api/v1/user', authRouter)

app.all('*',(req, res) =>{
    return res.status(404).send('OOPS!! 404 page not found');
});

app.use(errorMiddleware);

export default app;