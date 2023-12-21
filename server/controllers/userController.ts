
import { config } from 'dotenv';
config()
import { NextFunction, Request, Response } from 'express';
import User from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export async function registerUser(req: Request, res: Response) {
    const bcryptSalt = bcrypt.genSaltSync(10);
    const { name, email, password } = req.body
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(userDoc)
    } catch (e) {
        res.status(422).json(e)
    }
}

export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body
    const userDoc = await User.findOne({ email })
    if (userDoc) {
        const passOK = bcrypt.compareSync(password, userDoc.password!)
        if (passOK) {
            const user = { email: `${userDoc.email}`, id: userDoc._id }
            jwt.sign(user, `${process.env.ACCESS_TOKEN_SECRET}`, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc)
            })
        } else {
            res.status(422).json({ message: 'Incorrect Password' })
        }
    } else {
        res.json({ message: `Email: ${email} is not Registered` })
    }
}

export async function profile(req: Request, res: Response) {
    const { token } = req.cookies
    res.json({ token })
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]
    if (token) return res.status(401)

    jwt.verify(token!, `${process.env.ACCESS_TOKEN_SECRET}`, {}, (err, user) => {
        if (err) return res.status(403)
        next()
    })
}

// function generateAccessToken(user: Object) {
//     return jwt.sign(user, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '20m' })
// }

export async function RegenerateToken(req: Request, res: Response) {

}