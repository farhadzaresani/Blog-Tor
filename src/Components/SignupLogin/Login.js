import React from 'react'

export default function Login(props) {
  return (
    <form onSubmit={(e)=>e.preventDefault()} className='flex flex-col justify-center hover:shadow-2xl hover:scale-105 transition duration-700 deley-150  space-y-8 w-[100vw] lg:w-[35vw] mb-10 lg:mb-0 items-center  bg-[#FEFBF6] h-[130vw] lg:h-[35vw]   text-[30px]  rounded-[4vw] shadow-inner'>
     
    <h1 className='font-extrabold'>LogIn</h1>

      <div className='flex flex-col'>

      <label>UserName:</label>
        <input onChange={(e) => props.setEnterUserName(e.target.value)}  className=' border-b-[3px]' type='text' placeholder='Enter your Name'/>
      </div>
      <div className='flex flex-col'>

      <label>Password:</label>
        <input onChange={(e) => props.setPassword(e.target.value)}  className=' border-b-[3px]' type='password' placeholder='Enter your Password'/>
      </div>
      <button onClick={() => props.LogIn(props.enterUserName,props.password)} className='m-5  bg-blue-500 w-[200px] h-14 font-bold text-white flex justify-center items-center rounded-xl shadow-lg'>LogIn</button>
    </form>
  )
}
