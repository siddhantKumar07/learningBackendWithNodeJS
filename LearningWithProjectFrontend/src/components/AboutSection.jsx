import React from 'react'

const AboutSection = ({receiver}) => {
  return (
    <div className='h-full overflow-hidden w-[35%] backdrop-blur-3xl bg-black/35 px-5 py-8 flex flex-col justify-start gap-4'>
        <div className='h-[45%] w-full  mt-10 rounded-3xl'>
            <img className='h-full w-full bg-cover rounded-3xl ' src={receiver.photoUrl} alt="" />
        </div>
        <div className='flex flex-col items-center'>
            <h1 className='text-white text-3xl font-bold capitalize'>{receiver.firstName} {receiver.lastName}</h1>
            <p className='text-white text-lg font-semibold capitalize'>{receiver.about}</p>
        </div>
        <div className='flex gap-8 w-full justify-center border-2 px-2 py-2 mt-2 rounded-3xl border-white/20'>
            <div className='flex flex-col gap-1 border-r-2 px-8'>
                <h1 className='text-white text-lg font-semibold'>Age</h1>
                <p className='text-white text-lg font-semibold'>{receiver.age}</p>
            </div>
            <div className='flex flex-col gap-1'>
                <h1 className='text-white text-lg font-semibold'>Gender</h1>
                <p className='text-white text-lg font-semibold capitalize'>{receiver.gender}</p>
            </div>
            
        </div>
        <h1 className='text-center font-bold text-lg'>Skills :</h1>
        <div className='flex items-center gap-2.5 justify-center'>
               {receiver.skills.map((skill)=>(
                <h1 className='text-white text-lg font-semibold border-2 px-3 py-1 rounded-3xl'>{skill}</h1>
               ))}
        </div>
    </div>
  )
}


export default AboutSection