import React from 'react'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import Profile from './pages/profile'
import { Routes,Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from './utils/appStore'
import Feed from './pages/feed'
import PendingConnection from './pages/PendingConnections'
import { ToastContainer, Bounce } from 'react-toastify';
import Connections from './pages/Connection'
const App = () => {
  return (
    <div>
   <Provider store={store}>
       <Routes>
        <Route path='/' element={<Home />} >
        <Route path='/' index element={<Feed/>} />
        <Route path='profile' element={<Profile />} />
        <Route path='connections' element={<Connections />} />
        <Route path='pendingConnections' element={<PendingConnection />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
   </Provider>
         <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
    </div>
  )
}

export default App
