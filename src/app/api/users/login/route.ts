import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';



Connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;

        //Check if user exists
        const user = await User.findOne({email})

        if(!user){
            NextResponse.json({error: "User does not exist"}, {status: 500})
        }

        //Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            NextResponse.json({error: "Invalid Password"}, {status: 500})
        }

        //Create Token Data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //Create Token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response;


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}