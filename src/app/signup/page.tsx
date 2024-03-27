"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {

    const router = useRouter();

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({})

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const signupHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0 && user.confirmPassword.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('/api/users/signup', user)
            .then((res) => {
                console.log(res)
                console.log(res.data.message)
                router.push('/')
            })
            .catch((error: any) => {
                console.log("Signup Failed", error)
                setErrors(error.response.data)
            })
    }

    return (
        <div className="bg-slate-100 min-h-screen">
            <div className='flex items-center justify-center p-8'>
                <div className='bg-white rounded-2xl p-8 shadow-2xl space-y-8'>
                    <h1 className="text-2xl text-center text-blue-500">Signup</h1>
                    <form className='flex flex-col items-center space-y-6' onSubmit={submitHandler}>
                        <div className='space-x-2'>
                            <label className='text-lg'>Username:</label>
                            <input className='border border-black rounded-xl text-sm p-2' onChange={signupHandler} type="text" name='username' placeholder='username' />
                        </div>
                        <div className='space-x-2'>
                            <label className='text-lg'>Email:</label>
                            <input className='border border-black rounded-xl text-sm p-2' onChange={signupHandler} type="text" name='email' placeholder='email' />
                        </div>
                        {
                            errors.email ? <p className='text-red-500'>{errors.email}</p>: null
                        }
                        <div className='space-x-2'>
                            <label className='text-lg'>Password:</label>
                            <input className='border border-black rounded-xl text-sm p-2' onChange={signupHandler} type="password" name='password' placeholder='password' />
                        </div>
                        <div className='space-x-2'>
                            <label className='text-lg'>Confirm Password:</label>
                            <input className='border border-black rounded-xl text-sm p-2' onChange={signupHandler} type="password" name='confirmPassword' placeholder='password' />
                        </div>
                        {
                            errors.password ? <p className='text-red-500'>{errors.password}</p>: null
                        }
                        {
                            buttonDisabled ? null : <button className='w-1/2 bg-blue-500 hover:bg-blue-700 text-white hover:shadow-xl p-2 rounded-xl'>Signup</button>
                        }
                    </form>
                    <p className='text-center'><Link href='/'>Already Have an Acccount? Login</Link></p>
                </div>
            </div>
        </div>
    )
}