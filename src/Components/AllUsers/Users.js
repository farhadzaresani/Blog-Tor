import React from 'react'
import { Link } from 'react-router-dom'

export default function Users(props) {
  
  return (
    <div className='bg-[#3D3C42] flex flex-col  items-center '>
    <h1 className='text-[100px] fond-extrabold  text-[#FEFBF6] '>Users</h1>
<div  className='flex flex-wrap space-x-10 text-[#FEFBF6]  rounded-lg shadow-inner w-[80vw] justify-center items-center  '>
    { props.usersData=='' ?<div className='text-black font-bold opacity-30 text-5xl'>No Writers</div>
      :
props.usersData.map((item,i)=>{
  return( 
    <Link className='' key={i} to={`/singleUser/${item._id}`}>
      <div className=' '>
      <div className='  cursor-pointer  hover:scale-110 w-[17vw] lg:h-[35vw] h-[55vw] transition delay-75 duration-700   flex flex-col items-center '>
        <img className=' rounded-lg aspect-square object-cover mt-4'
          src={ item.avatar === ""
          ? 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
          : `http://localhost:4000/${item.avatar}`}/>
        <div className=' flex flex-col w-full'>

        <h1 className='text-[40px]'>{item.name}</h1>
        <p className='opacity-40' >{item.bio}</p>
        </div>
      </div>
      </div>
    </Link>
    )

  })
  }</div>




</div>
  )
}
