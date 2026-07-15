import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { base_url } from '../utils/constants'
import { addUser, removeUser } from '../utils/userSlice'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${base_url}/profile/view`, {
          withCredentials: true,
        })
        dispatch(addUser(response.data.user))
      } catch {
        dispatch(removeUser())
        navigate('/login', { replace: true })
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [dispatch])

  if (isLoading) return null

  return (
    <div className='h-[100vh]'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Home
