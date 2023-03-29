import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import { Navigate, redirect, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import {differenceInCalendarDays} from 'date-fns'


function BookingWidget({price}) {
    const {user} = useContext(UserContext)
    const {id} = useParams()
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [pickUp, setPickUp] = useState("")
    const [dropOff, setDropOff] = useState("")
    const [total, setTotal] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if (pickUp && dropOff) {
            setTotal(differenceInCalendarDays(new Date(dropOff), new Date(pickUp)) * price)
        }
    }, [dropOff, pickUp])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            return navigate('/login')
        } else {
            try {
                const response = await axios.post('/booking', {
                    name, 
                    phone, 
                    pickUp, 
                    dropOff, 
                    total,
                    post: id, 
                    bookerId: user._id
                })
                navigate('/account/reservations')
            } catch (error) {
                console.log(error)
            }
        }
    }  

  return (
    <div className='flex flex-col bg-white shadow-lg shadow-gray-300 rounded-xl mt-5 mr-5 mb-5'>
        <form className='flex flex-col px-4 py-3' onSubmit={handleSubmit}> 
            <h1 className='text-xl font-semibold mt-2 text-center'>Book here</h1>
            <input 
                type="text" 
                placeholder='name' 
                onChange={e => setName(e.target.value)}
            />
            <input 
                type="number" 
                placeholder="phone" 
                onChange={e => setPhone(e.target.value)}
            />
            
            <div className='flex flex-col px-3 py-2'>
                <label htmlFor="pickUp" className='font-semibold border-t'>Pick Up</label>
                <input 
                    type="date" 
                    id='pickUp' 
                    onChange={e => setPickUp(e.target.value)}
                    className="mb-4 border-b"
                />

                <label htmlFor="dropOff" className='font-semibold border-t'>Drop Off:</label>
                <input 
                    type="date" 
                    id='dropOff' 
                    onChange={e => setDropOff(e.target.value)}
                    className="border-b"
                />
            </div>

            <button 
                className='bg-primary text-white p-2 rounded-xl my-3 mx-2' 
                type='submit'
            >
                Make a reservation {total && " for $" + total}
            </button>
        </form>
    </div>
  )
}

export default BookingWidget