import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axios.get('/posts')
                setPosts([...response.data])
            } catch (error) {
                console.log(error)
            }
        }
        getPosts()
    }, [])



  return (
    <>
        <Header />
        <div className="flex justify-center bg-gray-100 pt-5">
            <div className='flex flex-col w-10/12'>
                {posts.length > 0 && posts.map((post) => {
                    return (
                        <Link to={`/view/${post._id}`} className='flex flex-col mb-8 border px-5 pb-5 pt-7 bg-white shadow-md shadow-gray-300 rounded-xl' key={post._id}>
                            <div className='flex justify-center '>
                                <img className="w-9/12 object-cover rounded-xl" src={post.photos[0]} alt=""/>
                            </div>

                            <div className='px-36 mx-2 pt-2'> 
                                <div className='flex justify-between items-center'>
                                    <h2 className='font-semibold text-xl'>{post.title}</h2>
                                    <p className="font-semibold text-xl text-primary">${post.price}</p>
                                </div>
                                <div className='flex gap-3'> 
                                    <p>- {post.features[0]}</p>
                                    <p>- {post.features[1]}</p>
                                    <p>- {post.features[2]}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    </>
  )
}

export default Home