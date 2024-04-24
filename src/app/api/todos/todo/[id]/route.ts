import Todo from "@/models/todoModel";
import { Connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

Connect()

export async function GET(request: NextRequest, { params }: any){
    try {
        const todoId = await params.id
        const todo = await Todo.findOne({ _id: todoId })
        return NextResponse.json(todo)
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}