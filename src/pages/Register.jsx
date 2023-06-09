import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import axios from 'axios'
import { UserContext } from '../context/UserContext'

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    let navigate = useNavigate()

    const {user} = useContext(UserContext)
    if (user) {
        return <Navigate to='/account' />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/register', {name, email, password})
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
        <Header />
        <div className='flex flex-col items-center h-screen justify-center -mt-36'>
            <h1 className='text-xl font-bold my-5'>Register</h1>
            <form onSubmit={handleSubmit} className="w-full px-4 xl:w-3/12">
                <div className='flex flex-col items-center'>
                    <input type="text" placeholder='name' onChange={(e) => setName(e.target.value)} className="w-full" />
                    <input type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)} className="w-full" />
                    <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} className="w-full" />

                    <span className='my-2'>Already have an account?<Link to='/login' className='font-semibold text-primary'> Login</Link></span>
                    <button type="submit" className='bg-primary text-white px-10 py-2 rounded-xl w-full'>Register</button>
                </div>
            </form>
        </div>
    </>    
  )
}

export default Register