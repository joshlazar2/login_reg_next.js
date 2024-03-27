'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {

    const router = useRouter();

    const [user, setUser] = useState({})

    const [myTodos, setMyTodos] = useState([])

    useEffect(() => {
        axios.get('/api/users/me')
            .then((res) => {
                console.log(res)
                console.log(res.data.message)
                setUser(res.data.data)
            })
            .catch((error: any) => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        axios.get('/api/todos/myTodos')
            .then((res) => {
                console.log(res)
                setMyTodos(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const logoutHandler = () => {
        axios.get('api/users/logout')
            .then((res) => {
                console.log(res)
                console.log(res.data.message)
                router.push('/')
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    //Research (any) and typescipt stuff
    const completedHandler = (id: any) => {
        axios.put(`/api/todos/complete/${id}`)
            .then((res) => {
                console.log(res)
                const updatedTodos = myTodos.filter(todo => todo._id !== id)
                setMyTodos(updatedTodos)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteHandler = (id: any) => {
        axios.delete(`/api/todos/delete/${id}`)
        .then((res) => {
            console.log(res)
            const updatedTodos = myTodos.filter(todo => todo._id !== id)
            setMyTodos(updatedTodos)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className='bg-slate-100 min-h-screen'>
            <div className='flex items-center justify-center p-8'>
                <div className='space-y-8 flex flex-col items-center'>
                    <div className='flex space-x-6 items-center'>
                        <h1 className='text-3xl text-blue-500'>Dashboard</h1>
                        <button className='bg-blue-500 text-white p-2 hover:bg-blue-700 hover:shadow-xl rounded-xl' onClick={logoutHandler}>Logout</button>
                    </div>
                    <div className='bg-white p-8 rounded-2xl shadow-2xl text-center space-y-8'>
                        <div className='space-y-4'>
                            <div className='flex items-center space-x-2'>
                                <p className="text-lg">Username:</p>
                                <p className='text-lg'>{user.username}</p>
                            </div>
                            <div className='flex items-center  space-x-2'>
                                <p className="text-lg">Email:</p>
                                <p className='text-lg'>{user.email}</p>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-4'>
                            <button onClick={() => router.push('/createTodo')} className='bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-700 hover:shadow-xl'>Create a Todo</button>
                            <button onClick={() => router.push('/completedTodos')} className='bg-green-500 text-white p-2 rounded-xl hover:bg-green-700 hover:shadow-xl'>View Completed Todo's</button>
                        </div>
                    </div>
                    <div className='flex flex-col items-center space-y-4'>
                        <h2 className='text-2xl text-blue-500'>My Todos</h2>
                        {
                            myTodos.map((todo: any) => (
                                <div key={todo._id} className='bg-white p-8 rounded-2xl shadow-2xl'>
                                    <div className='flex flex-col items-center space-y-4'>
                                        <p className='text-blue-500'>Content:</p>
                                        <p>{todo.content}</p>
                                        <button onClick={() => completedHandler(todo._id)} className='bg-green-500 text-white rounded-lg p-2 hover:bg-green-700 hover:shadow-xl w-[90px]'>Complete</button>
                                        <button onClick={() => deleteHandler(todo._id)} className='bg-red-500 text-white rounded-lg p-2 hover:bg-red-700 hover:shadow-xl w-[90px]'>Delete</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

//Fix Property 'username' does not exist on type '{}'.ts(2339)