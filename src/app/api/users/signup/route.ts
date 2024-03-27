import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import {isEmail} from 'validator';


Connect()

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {username, email, password, confirmPassword} = reqBody
        let errors: { [key: string]: string } = {}; //Research this with typescript strictness

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            errors.email = 'Email Already Exists'
            // return NextResponse.json({error: 'Email Already Exists'}, {status: 400})
        }

        if(!isEmail(email)){
            errors.email = 'Email is Invalid'
            // return NextResponse.json({error: 'Invalid Email'}, {status: 400})
        }

        if(password !== confirmPassword){
            errors.password = "Passwords Don't match"
            // return NextResponse.json({error: 'Passwords Do Not Match'}, {status: 400})
        }

        if(errors.email || errors.password){
            return NextResponse.json(errors, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        return NextResponse.json({message: "User Created Successfully", success: true})
    }
    catch (error: any){
        return NextResponse.json({error: error.message})
    }
}