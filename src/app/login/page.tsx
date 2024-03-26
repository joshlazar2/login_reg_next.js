"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {

    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const loginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('/api/users/login', user)
            .then((res) => {
                console.log(res)
                console.log(res.data.message)
                router.push('/dashboard')
            })
            .catch((error: any) => {
                console.log("Login Failed", error.response.data.error)
            })
    }

    return (
        <div className='min-h-screen bg-slate-100'>
            <div className="flex justify-center items-center p-8">
                <div className='bg-white p-8 rounded-2xl space-y-8 shadow-2xl'>
                    <h1 className="text-3xl text-center text-blue-500">Login</h1>
                    <form className='space-y-6 flex flex-col items-center' onSubmit={submitHandler}>
                        <div className='space-x-2'>
                            <label className="text-lg">Email:</label>
                            <input className='border border-black rounded-xl p-2 text-sm' onChange={loginHandler} type="text" name='email' />
                        </div>
                        <div className='space-x-2'>
                            <label className="text-lg">Password:</label>
                            <input className='border border-black rounded-xl p-2 text-sm' onChange={loginHandler} type="password" name='password' />
                        </div>
                        {
                            buttonDisabled ? null : <button className='bg-blue-500 text-white p-2 rounded-xl w-1/2 hover:bg-blue-700 hover:shadow-xl'>Login</button>
                        }
                    </form>
                    <p className='text-center'><Link href='/signup'>Dont Have an Account? Signup</Link></p>
                </div>
            </div>
        </div>
    )

}