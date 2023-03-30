import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function MyPosts({user}) {
    const [userPosts, setUserPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getUserPosts = async () => {
            if (user) {
                try {
                    const response = await axios.get(`/user-posts/${user._id}`)
                    setUserPosts([...response.data])
                } catch (error) {
                    console.log(error)
                }
            }
        }
        getUserPosts()
    }, [])

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/delete/${id}`, {headers: {Authorization: '***'}})
            navigate('/account')

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='mt9 h-full xl:h-screen bg-gray-200'>
        <h1 className='text-center font-bold text-lg py-5'> My Posts </h1>
        {userPosts.length > 0 && userPosts.map((post) => {
            return (

                <div key={post._id} className="flex flex-col mx-5 px-5 pt-3 rounded-xl mb-6 shadow-md shadow-gray-300 bg-white
                                                xl:flex">
                    {/* <Link to={`/account/create/${post._id}`} className='rounded-2xl px-3 flex justify-between items-center mb-5 shadow-lg shadow-gray-300 min-w-full bg-white overflow-hidden' > */}
                    <Link to={`/account/create/${post._id}`} className='xl:flex xl:justify-between xl:items-center xl:h-38' >
                        <img className="rounded-xl xl:w-2/12 xl:object-fit" src={post.photos[0]} alt=""/>

                        <h2 className='font-semibold text-primary text-md truncate py-2 xl:text-lg'>{post.title}</h2>

                        <p className='font-semibold mb-2 xl:text-xl'>${post.price}</p>

                        <div className='text-sm mb-4 xl:text-md'>
                            <p className='flex gap-2 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>

                                {post.features[0]}
                            </p>
                            <p className='flex gap-2 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>

                                {post.features[1]}
                            </p>
                            <p className='flex gap-2 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>

                                {post.features[2]}
                            </p>

                        </div>
                    </Link>

                    <div className='flex justify-center'>
                        <button 
                            className="py-1 px-3 bg-red-500 text-white rounded-xl mb-5 xl:px-6 xl:py-2" 
                            onClick={() => handleDelete(post._id)}
                        >
                            Delete        
                        </button>
                    </div>
                    
                </div>

            )
        })}
    </div>
  )
}

export default MyPosts