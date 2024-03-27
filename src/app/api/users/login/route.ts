import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';



Connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody;

        //Check if user exists
        const user = await User.findOne({ email })
        console.log(user)

        if (user) {
            const validPassword = await bcryptjs.compare(password, user.password)
            if (validPassword) {
                //Create Token Data
                const tokenData = {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
                //Create Token
                const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

                const response = NextResponse.json({
                    message: "Login successful",
                    success: true,
                })
                response.cookies.set("token", token, {
                    httpOnly: true
                })
                return response;
            } else {
                return NextResponse.json({ error: "Invalid Email/Password" }, { status: 400 })
            }
        } else {
            return NextResponse.json({ error: "Invalid Email/Password" }, { status: 400 })
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}