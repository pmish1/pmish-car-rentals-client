import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import axios from 'axios'
import { UserContext } from '../context/UserContext'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {setUser} = useContext(UserContext)
    let navigate = useNavigate()

    const {user} = useContext(UserContext)
    if (user) {
        return <Navigate to='/account' />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/login', {email, password})
            setUser(response.data)
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
        <Header />
        <div className='flex flex-col items-center h-screen'>
            <h1 className='text-xl font-bold mt-5 mb-5'>Login</h1>

                <form className='' onSubmit={handleSubmit}>
                    <div className='flex flex-col items-center'>
                        <input type="email" placeholder='email' onChange={e => setEmail(e.target.value)}/>
                        <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)}/>
                        <span className='my-2'>Don't have an account?<Link to='/register' className='font-semibold text-primary'> Register</Link></span>
                        <button className='bg-primary text-white px-10 py-2 rounded-xl' type='submit'>Login</button>
                    </div>
                </form>
        </div>
    </>
  )
}

export default Login