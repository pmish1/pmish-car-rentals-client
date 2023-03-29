import {createContext, useState, useEffect} from 'react'
import axios from 'axios'


export const UserContext = createContext()

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState()

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get('/profile')
            setUser(response.data)
        }
        getUser()
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}