import { Connect } from "@/dbConfig/dbConfig";
import Todo from "@/models/todoModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from '@/helpers/getDataFromToken'

Connect()

export async function POST(request: NextRequest){
    try {
        const userId = await getDataFromToken(request)
        const reqBody = await request.json()
        const {content} = reqBody;
        if(!content){
            return NextResponse.json({error: 'Content is Required'}, {status: 400})
        }
        const newTodo = new Todo({
            content,
            user_id: userId
        })

        await newTodo.save()

        return NextResponse.json({message: "Todo Created", success: true})

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}