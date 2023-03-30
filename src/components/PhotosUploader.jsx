import React from 'react'
import axios from 'axios'
import Image from './Image'

function PhotosUploader({photos, setPhotos}) {

    const uploadPhoto = async (e) => {
        const files = e.target.files
        const formData = new FormData()

        for (let photo of files) {
            formData.append('photos', photo)
        }

        try {
            const response = await axios.post('/upload', formData, {
                headers: {'Content-type': 'multipart/form-data'}
            })
            setPhotos(prev => [...prev, ...response.data])
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <input 
            className="hidden" 
            type="file" 
            id="file" 
            multiple
            onChange={uploadPhoto}
        />

        {/* <div className='grid grid-cols-3'> */}
        <div className='flex flex-col items-center xl:grid xl:grid-cols-3'>
            {photos.length > 0  && photos.map((link) => {
                return (
                    <div  key={Math.random()} className=""> 
                        <img src={link} alt="" className="mb-2"/>
                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default PhotosUploader

