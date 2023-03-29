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
        <div className=''>
            <h1 className='text-center font-bold text-xl my-4'>My reservations</h1>
            <div>
                {bookings.length > 0 && bookings.map((reservation) => {
                    return (
                        <Link to={`/view/${reservation.post._id}`} className='rounded-xl px-3 flex justify-between items-center mb-5 shadow-md shadow-gray-300 mx-32 overflow-hidden' key={reservation._id}>
                            <img className="w-48 -ml-3" src={reservation.post.photos[0]} alt=""/>
                            <h2 className='font-semibold text-primary text-lg'>{reservation.post.title}</h2>
                            <p>${reservation.total}</p>
                            <div className=''>
                                <p className='flex gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>

                                    {reservation.post.features[0]}
                                </p>
                                <p className='flex gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>

                                    {reservation.post.features[1]}
                                </p>
                                <p className='flex gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>

                                    {reservation.post.features[2]}
                                </p>

                            </div>
                            <div>
                                <p>Pick up: {format(new Date(reservation.pickUp), 'dd/MM/yyyy')}</p>
                                <p>Drop off: {format(new Date(reservation.dropOff), 'dd/MM/yyyy')}</p>
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