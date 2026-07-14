import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/home'
import { Routes } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} >
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Profile' element={<Profile />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App