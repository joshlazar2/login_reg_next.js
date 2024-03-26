import { Connect } from "@/dbConfig/dbConfig";
import Todo from "@/models/todoModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from '@/helpers/getDataFromToken'

Connect()

export async function GET(request: NextRequest){
    try {
        const userId = await getDataFromToken(request)
        const myTodos = await Todo.find({user_id: userId})
        return NextResponse.json(myTodos)
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}