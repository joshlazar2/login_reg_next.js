"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {

    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const loginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false)
        } else{
            setButtonDisabled(true)
        }
    }, [user])

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('/api/users/login', user)
        .then((res) => {
            console.log(res)
            console.log(res.data.message)
            router.push('/profile')
        })
        .catch((error: any) => {
            console.log("Login Failed", error.response.data.error)
            toast.error(error)
        }) 
    }

    return(
        <div className="flex justify-center">
            <h1 className="text-2xl">Login</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Email:</label>
                    <input onChange={loginHandler} type="text" name='email' />
                </div>
                <div>
                    <label>Password:</label>
                    <input onChange={loginHandler} type="password" name='password' />
                </div>
                {
                    buttonDisabled ? null : <button>Login</button>
                }
            </form>
            <Link href='/signup'>Dont Have an Account? Signup</Link>
        </div>
    )

}