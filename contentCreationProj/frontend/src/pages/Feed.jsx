import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Feed = () => {
    const [data, setData] = useState([])
    useEffect(()=>{
     const fetchPosts = async()=>{
        try{
            const response = await axios.get('http://localhost:3000/getPosts',{withCredentials:true})
            setData(response.data.data)
        }catch(error){
            console.error(error)
        }
        }
        fetchPosts()
    },[])
    if(data.length === 0){
        return (
            <div className='h-screen w-full flex items-center justify-center'>
                <h1 className='text-3xl font-bold text-center'>No posts found</h1>
            </div>
        )
    }
  return (
    <div className='h-screen w-full px-1 py-2 overflow-auto bg-gray-200 flex items-start justify-center flex-wrap gap-2'>
        {data.map((post)=>(
            <div className='h-[40%] w-[100%] sm:w-[20%] rounded-2xl bg-white px-1 py-2 flex flex-col items-center justify-center gap-2'>
           <div className='w-[95%] h-[80%] border-2 border-white rounded-2xl'> <img className=' rounded-2xl w-full h-full bg-cover' src={post.imageUrl} alt="" /></div>
           <h1 className='font-bold text-xl'>{post.caption}</h1>
        </div>
        ))}
    </div>
  )
}

export default Feed