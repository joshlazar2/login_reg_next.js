import Todo from "@/models/todoModel";
import { Connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

Connect()

export async function DELETE(request: NextRequest, { params }: any){
    try {
        const todoId = await params.id
        const result = await Todo.deleteOne({_id: todoId})
        return NextResponse.json(result, {status: 200})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status:400})
    }
}