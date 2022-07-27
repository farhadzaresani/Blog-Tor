import React from 'react'

export default function Signup(props) {
  return (
     <form onSubmit={(e)=>e.preventDefault()} className='flex flex-col justify-center items-center  space-y-6   bg-[#FEFBF6] w-[100vw] lg:w-[35vw]  h-[130vw] lg:h-[35vw] hover:shadow-2xl hover:scale-105 transition duration-700 deley-150   text-[30px] m-10 rounded-[4vw] shadow-inner'>
      <h1 className='font-extrabold '>SignUp</h1>
      <div className='flex flex-col  '>
      <label>UserName:</label>
        <input onChange={(e) => props.setUserName(e.target.value)}  className=' border-b-[3px]' type='text' placeholder='Enter an username'/>
      </div>
      <div className='flex flex-col'>

      <label>Name:</label>
        <input onChange={(e) => props.setName(e.target.value)} className=' border-b-[3px]' type='text' placeholder='Enter a name'/>
      <label className='text-[20px]'>Your Password is 1111</label>
      </div>
      <div>
      <button onClick={() => props.SignUp(props.name,props.userName)} className=' bg-blue-500 w-[200px] h-14 font-bold text-white flex justify-center items-center rounded-xl shadow-lg'>SignUp</button>
      
      </div>
    </form> 
  )
}
