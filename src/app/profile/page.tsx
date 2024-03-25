'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {

    const router = useRouter();

    const [user, setUser] = useState({})

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

    const logoutHandler = () => {
        axios.get('api/users/logout')
            .then((res) => {
                console.log(res)
                console.log(res.data.message)
                router.push('/login')
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    return (
        <div className='flex flex-col items-center'>
            <h1>Profile</h1>
            <button onClick={logoutHandler}>Logout</button>
            <div>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
            </div>
        </div>
    )
}

//Fix Property 'username' does not exist on type '{}'.ts(2339)