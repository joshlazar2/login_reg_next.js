"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignupPage() {

    const router = useRouter();

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const signupHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
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
            router.push('/login')
        })
        .catch((error: any) => {
            console.log("Signup Failed", error.response.data.error)
            toast.error(error)
        })
    }

    return (
        <div className="flex justify-center">
            <h1 className="text-2xl">Signup</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Username:</label>
                    <input onChange={signupHandler} type="text" name='username' placeholder='username' />
                </div>
                <div>
                    <label>Email:</label>
                    <input onChange={signupHandler} type="text" name='email' placeholder='email' />
                </div>
                <div>
                    <label>Password:</label>
                    <input onChange={signupHandler} type="password" name='password' placeholder='password' />
                </div>
                {
                    buttonDisabled ? null : <button>Signup</button>
                }
            </form>
            <Link href='/login'>Already Have an Acccount? Login</Link>
        </div>
    )
}