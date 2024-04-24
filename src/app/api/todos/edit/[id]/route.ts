import Todo from "@/models/todoModel";
import { Connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from 'next/server';

Connect()

export async function PUT(request: NextRequest, { params }: any){
    try {
        const todoId = await params.id
        const reqBody = await request.json()
        const {content} = reqBody;
        const editedTodo = await Todo.findOneAndUpdate(
            {_id: todoId},
            [{$set: {content: content}}],
            { new: true, runValidators: true }
        )
        return NextResponse.json({message: "Todo Edited", success: true})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}