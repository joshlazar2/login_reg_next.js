'use client'
import React, { useState, useEffect } from 'react';
import axios, {AxiosError} from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function completedTodosPage() {

    //Fix map method type: any
    //Study the Todo interface and how it effects the completed and delete handlers

    const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

    interface TodoId {
        _id?: string
    }

    interface Todo {
        _id?: string,
        content?: string,
        user_id?: string,
        completed?: boolean,
        createdAt?: string,
        updatedAt?: string,
        __v?: number
    }

    useEffect(() => {
        axios.get('/api/todos/myTodosCompleted')
            .then((res) => {
                console.log(res)
                setCompletedTodos(res.data)
            })
            .catch((err: AxiosError) => {
                console.log(err.message); // Accessing the message property
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                }
            });
    }, [])

    //Research (any) and typescipt stuff
    const completedHandler = (id: TodoId) => {
        axios.put(`/api/todos/complete/${id}`)
            .then((res) => {
                console.log(res)
                const updatedTodos = completedTodos.filter(todo => todo._id !== id)
                setCompletedTodos(updatedTodos)
            })
            .catch((err: AxiosError) => {
                console.log(err.message); // Accessing the message property
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                }
            });
    }

    const deleteHandler = (id: TodoId) => {
        axios.delete(`/api/todos/delete/${id}`)
        .then((res) => {
            console.log(res)
            const updatedTodos = completedTodos.filter(todo => todo._id !== id)
            setCompletedTodos(updatedTodos)
        })
        .catch((err: AxiosError) => {
            console.log(err.message); // Accessing the message property
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            }
        });
    }

    return (
        <div className='min-h-screen bg-slate-100'>
            <div className='flex justify-center items-center p-8'>
                <div className='space-y-8'>
                    <h1 className='text-blue-500 text-3xl'>Completed Todos</h1>
                    <p className='text-center'><Link href='/dashboard'>Back to Dashboard</Link></p>
                    <div className='space-y-4'>
                        {
                            completedTodos.map((todo: any) => (
                                <div key={todo._id} className='bg-white p-8 rounded-2xl shadow-2xl'>
                                    <div className='flex flex-col items-center space-y-4'>
                                        <p className='text-blue-500'>Content:</p>
                                        <p>{todo.content}</p>
                                        <button onClick={() => completedHandler(todo._id)} className='bg-green-500 text-white rounded-lg p-2 hover:bg-green-700 hover:shadow-xl'>Not Completed</button>
                                        <button onClick={() => deleteHandler(todo._id)} className='bg-red-500 text-white rounded-lg p-2 hover:bg-red-700 hover:shadow-xl w-[90px]'>Delete</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}