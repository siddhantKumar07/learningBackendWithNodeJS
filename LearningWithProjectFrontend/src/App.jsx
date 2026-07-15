import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import Profile from './pages/profile'
import { Routes,Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from './utils/appStore'
const App = () => {
  return (
    <div>
   <Provider store={store}>
       <Routes>
        <Route path='/' element={<Home />} >
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Profile' element={<Profile />} />
        </Route>
      </Routes>
   </Provider>
    </div>
  )
}

export default App