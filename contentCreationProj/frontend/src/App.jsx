import React from 'react'
import { Route,Routes } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<CreatePost/>} />
      <Route path='/about' element={<h1>About Page</h1>} />
    </Routes>
  )
}

export default App