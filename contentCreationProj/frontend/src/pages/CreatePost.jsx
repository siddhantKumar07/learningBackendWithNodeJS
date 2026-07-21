import axios from 'axios'
import React from 'react'

const CreatePost = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.target)
      console.log(formData)
      const response = await axios.post('http://localhost:3000/createPost', formData, {
        withCredentials: true
      })
      console.log(response.data)
      e.currentTarget.reset()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className='h-screen w-full flex  items-center justify-center '>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-4 border-2 h-[50%] border-green-400 p-5 rounded-lg bg-slate-200'>
          <h1 className='text-3xl underline text-center w-full font-bold'>Create posts</h1>
        <input className='px-1 py-1 bg-amber-200 font-semibold' type="file" id="img" accept='image/*' name='image'  required/>
        <textarea className='px-2 py-1 bg-amber-200 w-[300px] max-w-[600px] max-h-[150px] font-semibold' placeholder='enter your caption' id="caption" name='caption'required />
        <button className='bg-green-400 ml-auto mr-auto my-7 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500'>Create Post</button>
      </form>
    </div>
  )
}

export default CreatePost