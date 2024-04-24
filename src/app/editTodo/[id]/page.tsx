"use client";
import React, { useState, useEffect } from 'react';
import axios, {AxiosError} from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'

export default function EditTodoPage() {

    const params = useParams<{ id: string }>()

    interface AxiosResponseError {
        response?: {
            data?: {
                error?: string
            }
        }
    }

    interface Error {
        error?: string,
        general?: string
    }

    interface Todo {
        _id?: string;
        content?: string;
        user_id?: string;
        completed?: boolean;
        createdAt?: string;
        updatedAt?: string;
        __v?: number;
    }

    const router = useRouter();

    const [todo, setTodo] = useState<Todo>({})

    const [updatedTodo, setUpdatedTodo] = useState({
        content: ''
    })

    const [error, setError] = useState<Error>({})

    useEffect(() => {
        axios.get(`/api/todos/todo/${params.id}`)
            .then((res) => {
                setTodo(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [])

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedTodo({ ...updatedTodo, [e.target.name]: e.target.value })
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.put(`/api/todos/edit/${params.id}`, updatedTodo)
            .then((res) => {
                console.log(res)
                router.push('/dashboard')
            })
            .catch((err: AxiosResponseError) => {
                console.log(err)
                if (err.response && err.response.data){
                    setError(err.response.data)
                } else {
                    setError({ general: "An unexpected error occurred" });
                }

            })
    }

    return (
        <div className='min-h-screen bg-slate-100'>
            <div className='flex items-center justify-center p-8'>
                <div className='space-y-8'>
                    <h1 className='text-center text-blue-500 text-3xl'>New Todo</h1>
                    <div className='bg-white rounded-2xl shadow-2xl p-8'>
                        <form className='flex flex-col items-center space-y-4' onSubmit={submitHandler}>
                            <div className='space-x-2'>
                                <label className="text-lg">Content:</label>
                                <input className='border border-black rounded-xl p-2 text-sm' onChange={changeHandler} type="text" name="content" placeholder={todo.content} />
                            </div>
                            {
                                error.error ? <p className='text-red-500'>{error.error}</p> : null
                            }
                            {
                                error.general ? <p className='text-red-500'>{error.general}</p> : null
                            }
                            <button className='bg-blue-500 gover:bg-blue-700 hover:shadow-xl rounded-xl text-white p-2'>Submit</button>
                        </form>
                        <p className='text-center mt-4'><Link href='/dashboard'>Back</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}