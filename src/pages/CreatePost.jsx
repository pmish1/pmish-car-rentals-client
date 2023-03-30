import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import PhotosUploader from '../components/PhotosUploader'
import { Navigate, redirect, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function CreatePost() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [photos, setPhotos] = useState([])
    const [formFactor, setFormFactor] = useState("")
    const [drive, setDrive] = useState("")
    const [fuel, setFuel] = useState("")
    let navigate = useNavigate()

    const {user} = useContext(UserContext)
    if (!user) {
        return <Navigate to='/login' />
    }

    let {id} = useParams()

    useEffect(() => {
        if (id) {
            const getPost = async () => {
                try {
                    const response = await axios.get(`/post/${id}`)
                    setTitle(response.data.title)
                    setDescription(response.data.description)
                    setPrice(response.data.price)
                    setPhotos(response.data.photos)
                } catch (error) {
                    console.log(error)
                }
            }
            getPost()
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('handel sumbit ran')

        if (id) {
            //update post 
            try {
                const response = await axios.put('/update', {
                    title, 
                    photos,
                    description, 
                    price, 
                    features: [formFactor, drive, fuel],
                    id
                })

            } catch (error) {
                console.log(error)
            }
        } else {
            //create post 
            try {
                const response = await axios.post('/create', {
                    title, 
                    photos,
                    description, 
                    price, 
                    features: [formFactor, drive, fuel]
                })
                navigate('/account')
            } catch (error) {
                console.log(error)
            }
        }
        return navigate('/account')
    }

  return (
    <>
        <Header/>
        <div className="xl:flex xl:justify-center">
            <div className='flex flex-col items-center px-5 xl:w-7/12'>
                {id ? 
                    <h1 className='font-bold text-xl mt-5'>Update</h1> 
                    : 
                    <h1 className='font-bold text-xl mt-5'>Create</h1>
                }
                <form onSubmit={handleSubmit} className="flex flex-col max-w-36 overflow-x-hidden">
                    <label htmlFor="title" className='text-primary border-b border-primary mt-3 mb-2 font-semibold text-xl'>Title</label>
                    <input 
                        type="text" 
                        placeholder='title' 
                        onChange={e => setTitle(e.target.value)}
                        value={title ? title : ""}
                        id='title'
                    />
                    
                
                    <label htmlFor="description" className='text-primary border-b border-primary mt-3 mb-2 font-semibold text-xl'>Description</label>
                    <textarea  
                        placeholder="description" 
                        onChange={e => setDescription(e.target.value)}
                        value={description ? description : ""}
                        id='description'
                    />

                    <label htmlFor="price" className='text-primary border-b border-primary mt-3 mb-2 font-semibold text-xl'>Price</label>
                    <input 
                        type="text" 
                        placeholder='price' 
                        onChange={e => setPrice(e.target.value)}
                        value={price ? price : ""}
                        id="price"
                    />
                    {/* form factor */}
                    <label htmlFor="formFactor" className='text-primary mb-4 mt-2 border-b border-primary font-semibold text-xl'>Form Factor</label>
                    <div id="formFactor" className='flex justify-between gap-2'>
                        
                        <label htmlFor="sedan" className='border-2 border-primary px-3 py-1 rounded-xl'>
                            <input 
                                type="radio" 
                                id="sedan" 
                                value="sedan" 
                                name="formfactor"
                                onChange={(e) => setFormFactor(e.target.value)}
                                checked={formFactor === 'sedan' ? true : false}
                                className="mr-2"
                            />
                            Sedan
                        </label>

                        
                        <label htmlFor="coupe" className="border-2 border-primary px-3 py-1 rounded-xl">
                            <input 
                            type="radio" 
                            id="coupe" 
                            value="coupe" 
                            name="formfactor"
                            onChange={(e) => setFormFactor(e.target.value)}
                            checked={formFactor === 'coupe' ? true : false}
                            className="mr-2"
                        />
                            Coupe
                        </label>

                        
                        <label htmlFor="SUV" className="border-2 border-primary px-3 py-1 rounded-xl">
                            <input 
                            type="radio" 
                            id="SUV" 
                            value="SUV" 
                            name="formfactor"
                            onChange={(e) => setFormFactor(e.target.value)}
                            checked={formFactor === 'SUV' ? true : false}
                            className="mr-2"
                        />
                            SUV
                        </label>

                        
                        <label htmlFor="hatch" className="border-2 border-primary px-3 py-1 rounded-xl">
                            <input 
                            type="radio" 
                            id="hatch" 
                            value="hatch" 
                            name="formfactor"
                            onChange={(e) => setFormFactor(e.target.value)}
                            checked={formFactor === 'hatch' ? true : false}
                            className="mr-2"
                        />
                            Hatch
                        </label>

                        
                        <label htmlFor="ute" className="border-2 border-primary px-3 py-1 rounded-xl">
                            <input 
                            type="radio" 
                            id="ute" 
                            value="ute" 
                            name="formfactor"
                            onChange={(e) => setFormFactor(e.target.value)}
                            checked={formFactor === 'ute' ? true : false}
                            className="mr-2"
                        />
                            Ute
                        </label>
                    </div>
                    {/* drive */}
                    <label htmlFor="transmission" className='text-primary mb-4 mt-2 border-b border-primary font-semibold text-xl'>Transmission</label>
                    <div id="transmission" className='flex justify-start gap-16'>
                        
                        <label htmlFor="automatic" className="border-2 border-primary px-3 py-1 rounded-xl">
                            <input 
                            type="radio" 
                            id="automatic" 
                            value="automatic" 
                            name="drive"
                            onChange={(e) => setDrive(e.target.value)}
                            checked={drive === 'automatic' ? true : false}
                            className="mr-2"
                            />
                            Automatic
                        </label>

                        
                        <label htmlFor="manual" className="border-2 border-primary px-3 py-1 rounded-xl ml-3">
                            <input 
                            type="radio" 
                            id="manual" 
                            value="manual" 
                            name="drive"
                            onChange={(e) => setDrive(e.target.value)}
                            checked={drive === 'manual' ? true : false}
                            className="mr-2"
                            />
                            Manual
                        </label>
                    </div>

                    {/* fuel */}
                    <label htmlFor="fuel" className='text-primary mb-4 mt-2 border-b border-primary font-semibold text-xl'>Fuel</label>
                    <div id="fuel" className='flex justify-between gap-2'>
                        
                        <label htmlFor="petrol" className="border-2 border-primary px-3 py-1 rounded-xl">
                            <input 
                            type="radio" 
                            id="petrol" 
                            value="petrol" 
                            name="fuel"
                            onChange={(e) => setFuel(e.target.value)}
                            checked={fuel === 'petrol' ? true : false}
                            className="mr-2"
                        />
                            Petrol
                        </label>

                        
                        <label htmlFor="diesel" className="border-2 border-primary px-3 py-1 rounded-xl">
                            <input 
                            type="radio" 
                            id="diesel" 
                            value="diesel" 
                            name="fuel"
                            onChange={(e) => setFuel(e.target.value)}
                            checked={fuel === 'diesel' ? true : false}
                            className="mr-2"
                        />
                            Diesel
                        </label>

                        
                        <label htmlFor="electric" className="border-2 border-primary px-3 py-1 rounded-xl">
                            <input 
                            type="radio" 
                            id="electric" 
                            value="electric" 
                            name="fuel"
                            onChange={(e) => setFuel(e.target.value)}
                            checked={fuel === 'electric' ? true : false}
                            className="mr-2"
                        />
                            Electric
                        </label>

                        
                        <label htmlFor="hybrid" className="border-2 border-primary px-3 py-1 rounded-xl">
                            <input 
                            type="radio" 
                            id="hybrid" 
                            value="hybrid" 
                            name="fuel"
                            onChange={(e) => setFuel(e.target.value)}
                            checked={fuel === 'hybrid' ? true : false}
                            className="mr-2"
                        />
                            Hybrid
                        </label>
                    </div>

                    <label htmlFor="file" className='flex gap-4 bg-white w-36 px-6 py-2 rounded-xl my-5 border border-2 border-primary text-primary'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-15 h-15">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        Upload Photos
                    </label>
                    <PhotosUploader photos={photos} setPhotos={setPhotos} />

                    <button type='submit' className="bg-primary p-3 rounded-xl text-white my-5">
                        {id ? 'Save changes' : "Create"}
                    </button>
                </form>
            </div>

        </div>
    </>
    
  )
}

export default CreatePost