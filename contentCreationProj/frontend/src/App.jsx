import React from 'react'
import { Route,Routes } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<CreatePost/>} />
      <Route path='/feed' element={<Feed/>} />
    </Routes>
  )
}

export default App