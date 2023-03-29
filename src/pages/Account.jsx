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
        <div className='flex flex-col pt-3 pb-8 bg-gray-100'>
            
            <div className='flex justify-evenly items-end'>
                <div className='flex flex-col items-start'>
                    <h1 className='mt-5 font-bold text-xl'>Account</h1>
                    {user && (
                        <>
                            <h1>Name: {user.name}</h1>
                            <h2>Email: {user.email} </h2>
                        </>
                    )}
                    <button className="bg-red-500 text-white px-3 py-1 rounded-xl mt-2" onClick={handleClick}>Logout</button>
                </div>

                <div className='flex flex-col gap-2 my-2'>
                    <Link className="bg-primary text-white py-2 px-3 rounded-2xl" to='/account/reservations'>See reservations</Link>
                    <Link className="bg-primary text-white py-2 px-3 text-center rounded-2xl" to='/account/create'>Create post</Link>
                </div>

            </div>
                    

        </div>
        <MyPosts user={user}/>
    </>
  )
}

export default Account