"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function createTodoPage() {

    const router = useRouter();

    const [todo, setTodo] = useState({
        content: ''
    })

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({ ...todo, [e.target.name]: e.target.value })
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('/api/todos/create', todo)
            .then((res) => {
                console.log(res)
                router.push('/dashboard')
            })
            .catch((err) => {
                console.log(err)
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
                                <input className='border border-black rounded-xl p-2 text-sm' onChange={changeHandler} type="text" name="content" />
                            </div>
                            <button className='bg-blue-500 gover:bg-blue-700 hover:shadow-xl rounded-xl text-white p-2'>Submit</button>
                        </form>
                        <p className='text-center mt-4'><Link href='/dashboard'>Back</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}