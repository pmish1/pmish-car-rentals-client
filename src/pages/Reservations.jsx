import axios from 'axios'
import { format } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { UserContext } from '../context/UserContext'

function Reservations() {
    const [bookings, setBookings] = useState([])
    const {user} = useContext(UserContext)

    useEffect(() => {
        const getBookings = async () => {
            if (user) {
                try {
                    const response = await axios.get(`/bookings/${user._id}`)
                    setBookings([...response.data])
                } catch (error) {
                    console.log(error)
                }
            }
        }
        getBookings()
    }, [])

  return (
    <>
        <Header />
        <div className='bg-gray-200 pt-1 xl:h-screen'>
            <h1 className='text-center font-bold text-lg my-4 xl:text-xl'>My reservations</h1>
            <div className='flex flex-col px-5'>
                {bookings.length > 0 && bookings.map((reservation) => {
                    return (
                        <Link to={`/view/${reservation.post._id}`} className=" flex flex-col items-center rounded-xl mb-5 px-4 pt-4 shadow-md bg-white
                                                                                xl:flex-row xl:justify-between xl:h-36 xl:items-center" key={reservation._id}>
                            <img className="rounded-xl mb-2 xl:w-48 xl:mb-4 xl:-ml-1" src={reservation.post.photos[0]} alt=""/>
                            <h2 className='font-semibold text-primary text-lg xl:text-xl'>{reservation.post.title}</h2>
                            <p className='font-semibold xl:text-xl'>${reservation.total}</p>

                            <div className='grid grid-cols-2 my-3 text-sm xl:text-lg'>
                                <div className='col-span-1'>
                                    <p className='flex gap-2 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>

                                        {reservation.post.features[0]}
                                    </p>
                                    <p className='flex gap-2 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>

                                        {reservation.post.features[1]}
                                    </p>
                                    <p className='flex gap-2 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>

                                        {reservation.post.features[2]}
                                    </p>

                                </div>
                                <div className='col-span-1 flex flex-col justify-center pl-5'>
                                    <p>Pick up: {format(new Date(reservation.pickUp), 'dd/MM/yyyy')}</p>
                                    <p>Drop off: {format(new Date(reservation.dropOff), 'dd/MM/yyyy')}</p>
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

export default Reservations