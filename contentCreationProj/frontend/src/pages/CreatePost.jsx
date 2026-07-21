import React, { useState } from 'react'

const CreatePost = () => {
    const [form, setForm] = useState({
        image: '',
        caption: ''
    })
    const handleChange=(e)=>{
        const {name,value}=e.target
        setForm((prev)=>({
            ...prev,
            [name]: value
        }
  
        ))
    }
    const handleSubmit = (e)=>{
        e.preventDefault() 
        console.log(form)
    }
  return (
    <div className='h-screen w-full flex  items-center justify-center '>
      <form onSubmit={handleSubmit} className='flex flex-col items-start justify-start gap-4 border-2 h-[60%] border-green-400 p-5 rounded-lg bg-slate-200'>
          <h1 className='text-3xl underline text-center w-full font-bold'>Create posts</h1>
        <div className='flex gap-5 text-xl  mt-8'>
            <label className='text-green-400 font-semibold' htmlFor="img">Image :</label>
        <input value={form.image} onChange={handleChange} className='px-1 py-1 bg-amber-200 font-semibold' type="file" id="img" accept='image/*' name='image'  required/>
        </div>
        <div className='flex gap-5 text-xl mt-9'>
            <label className='text-green-400 font-semibold' htmlFor="caption">Caption :</label>
        <textarea value={form.caption} onChange={handleChange} className='px-2 py-1 bg-amber-200 w-[300px] max-w-[600px] max-h-[150px] font-semibold' placeholder='enter your caption' id="caption" name='caption'required />
        </div>
        <button className='bg-green-400 ml-auto mr-auto my-7 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500'>Create Post</button>
      </form>
    </div>
  )
}

export default CreatePost