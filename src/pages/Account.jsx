import React, { useContext } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import MyPosts from '../components/MyPosts'

function Account() {
    let navigate = useNavigate()
    let {user, setUser} = useContext(UserContext)

    const handleClick = async () => {
        try {
            const response = await axios.get('/logout')
            setUser(null)
            if (response) navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
        <Header/>
        <div className='flex flex-col mt-1 bg-white'>
            
            <div className='flex justify-evenly items-end mb-8 mt-5'>
                <div className='flex flex-col items-start'>
                    <h1 className='mt-5 font-bold text-xl'>Account</h1>
                    {user && (
                        <div className=''>
                            <h1 className='text-sm'>Name: {user.name}</h1>
                            <h2 className='text-sm'>Email: {user.email} </h2>
                        </div>
                    )}
                    <button className="bg-red-500 text-white px-3 py-1 rounded-xl mt-2 text-sm" onClick={handleClick}>Logout</button>
                </div>

                <div className='flex flex-col gap-2 my-2'>
                    <Link className="bg-primary text-white py-2 px-3 rounded-xl text-center text-sm" to='/account/reservations'>See reservations</Link>
                    <Link className="bg-primary text-white py-2 px-3 text-center rounded-xl text-sm" to='/account/create'>Create post</Link>
                </div>

            </div>
                    

            <MyPosts user={user}/>
        </div>
    </>
  )
}

export default Account