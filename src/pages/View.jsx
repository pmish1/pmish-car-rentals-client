import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from '../components/BookingWidget'
import Header from '../components/Header'


function View() {
    const {id} = useParams()
    const [post, setPost] = useState(null)
    const [showPhotos, setShowPhotos] = useState(false)
    
    useEffect(() => {
        const getPost = async () => {
            if (id) {
                try {
                    const response = await axios.get(`/post/${id}`)
                    setPost(response.data)
                } catch (error) {
                    console.error(error)
                }
            }
        }
        getPost()
    }, [id])

    if (showPhotos) {
        return (
            <div className="min-h-screen bg-black w-full flex flex-col items-center relative px-5">

                <button className='text-white absolute right-3 top-3 xl:right-8 xl:top-5' onClick={() => setShowPhotos(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 xl:w-10 xl:h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

                {post && post.photos.map(photo => {
                    return (
                        <img src={photo} alt="" className='mt-10 mb-3' key={Math.random()}/>
                    )
                })}
            </div>
        )
    }

  return (
    <>
        <Header />
       <div className=''>
            {post && (
                <div className='flex flex-col xl:items-center' key={post._id}>
                    <div className='flex flex-col items-center my-3 px-4 mt-5 
                                    xl:w-9/12'>
                        <h1 className='text-xl font-bold mb-2 xl:text-2xl'>{post.title}</h1>
                        <img className="w-full rounded-xl xl:w-10/12 xl:shadow-lg xl:shadow xl:shadow-gray-400" src={post.photos[0]} alt="" />
                        <button 
                            onClick={() => setShowPhotos(true)}
                            className="flex gap-2 mt-5 mb-3 border border-primary bg-white p-2 rounded-xl"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                            </svg>

                            See more photos
                        </button>
                    </div>

                    {/* <div className="grid grid-cols-3 bg-gray-100"> */}
                    <div className='flex flex-col bg-gray-200 items-center
                                    xl:grid xl:grid-cols-3'>
                        <div className=' flex flex-col items-start max-w-full px-10 py-6 
                                        xl:col-span-2 xl:h-full'>
                            <p className='text-primary font-bold text-2xl'>${post.price} <span className='text-black font-normal text-sm xl:text-xl'>per day</span></p>

                            <div className="max-h-md leading-loose my-3 text-sm xl:text-lg xl:leading-loose">
                                <p>{post.description}</p>
                            </div>


                            <div className='text-sm xl:text-lg'>
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
                        </div>
                        <div className='xl:col-span-1'>
                            <BookingWidget price={post.price} />
                        </div>
                    </div>
                </div>
            )}
       </div>
    </>
  )
}

export default View