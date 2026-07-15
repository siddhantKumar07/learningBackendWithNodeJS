import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import Profile from './pages/profile'
import { Routes,Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from './utils/appStore'
import Feed from './pages/feed'
const App = () => {
  return (
    <div>
   <Provider store={store}>
       <Routes>
        <Route path='/' element={<Home />} >
        <Route path='/' element={<Feed/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
   </Provider>
    </div>
  )
}

export default App