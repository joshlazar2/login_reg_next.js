import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Content is Required"]
    },
    user_id: {
        type: mongoose.Types.ObjectId
    }
}, {timestamps: true})

const Todo = mongoose.models.todos || mongoose.model('todos', todoSchema)

export default Todo;