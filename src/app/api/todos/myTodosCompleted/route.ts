import Todo from "@/models/todoModel";
import { Connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from '@/helpers/getDataFromToken'

Connect()

export async function GET(request: NextRequest){
    try {
        const userId = await getDataFromToken(request);
        const myTodosCompleted = await Todo.find({user_id: userId, completed: true})
        return NextResponse.json(myTodosCompleted)
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}