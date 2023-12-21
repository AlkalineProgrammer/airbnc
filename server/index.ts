import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import { loginUser, profile, registerUser } from './controllers/userController';
import cookieParser from 'cookie-parser'
const app = express();
config()
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',

}));
app.post('/register', registerUser)
app.post('/login', loginUser)
app.get('/profile', profile)


mongoose.connect(`${process.env.MONGO_URL}`).then(() => {
    console.log(`Listening to port ${PORT} `)
    app.listen(PORT);
})
