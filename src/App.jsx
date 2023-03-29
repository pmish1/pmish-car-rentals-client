import { BrowserRouter, Navigate, redirect, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'
import { UserContext } from './context/UserContext'
import Account from './pages/Account'
import { useContext } from 'react'
import Reservations from './pages/Reservations'
import CreateReservations from './pages/CreatePost'
import View from './pages/View'

// axios.defaults.baseURL = "http://localhost:4000/api"
axios.defaults.baseURL = "https://pmish-car-rentals-api.herokuapp.com/api"
//allows it to accept cookies, when being sent from different hosts 
axios.defaults.withCredentials = true 

function App() {
    const {user} = useContext(UserContext)

    const ProtectedRoutes = ({children}) => {
        if (!user) {
            return <Navigate to='/login' />
        } else {
            return children
        }
    }

  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                <Route path='/account' element={<ProtectedRoutes> <Account/> </ProtectedRoutes>} />
                <Route path='/account/reservations' element={<ProtectedRoutes> <Reservations/> </ProtectedRoutes>} />
                <Route path='/account/create' element={<ProtectedRoutes> <CreateReservations/> </ProtectedRoutes>} />
                <Route path="/account/create/:id" element={<ProtectedRoutes> <CreateReservations/> </ProtectedRoutes>} />

                <Route path='/view/:id' element={<View /> } />

            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
