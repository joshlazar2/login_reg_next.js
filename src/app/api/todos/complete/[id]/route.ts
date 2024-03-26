import Todo from "@/models/todoModel";
import { Connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from 'next/server';

Connect()

export async function PUT(request: NextRequest, { params }: any){
    try {
        const todoId = await params.id
        const completedTodo = await Todo.findOneAndUpdate(
            {_id: todoId},
            [{$set: {completed: {$not: "$completed"}}}],
            { new: true, runValidators: true }
        )
        return NextResponse.json({message: "Todo Completed", success: true})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}