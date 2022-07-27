import React from 'react'
import { Link } from 'react-router-dom';
import { selectUser, setuser } from './userReducer';
import { useSelector } from 'react-redux/es/exports';
import Cookies from 'universal-cookie'
  const cookies = new Cookies()
  const token = cookies.get('ut')


export default function NavBar() {

const thisUser=useSelector(selectUser)
  
  
  // console.log(token)


  // {
  //   if(!thisUser._id)
  //   return <div>loading</div>
  // }

  return (
   
    <div className="bg-[#7F5283] z-10 shadow-md flex justify-center h-[60px] text-[20px] items-center sticky top-0 border-b-2 border-[#A6D1E6]">

      <div className="  space-x-10 lg:space-x-36 font-extrabold flex">
        <Link className='text-[#EFEFEF] hover:text-[#A6D1E6] hover:scale-110  transition delay-75 duration-700 ' to="/">Home </Link>
        <Link className='text-[#EFEFEF] hover:text-[#A6D1E6] hover:scale-110  transition delay-75 duration-700 ' to="/AllBlogs">Blogs </Link>
        <Link className='text-[#EFEFEF] hover:text-[#A6D1E6] hover:scale-110  transition delay-75 duration-700 ' to="/AllUsers">Users </Link>
     
      </div>

      <div className='absolute right-4'>

      {thisUser && thisUser._id
      ?
<Link className='' to={`/Dashboard/MyBlogs`}>
      <div className='flex flex-col justify-center items-center mb-2  w-6 hover:scale-110   transition delay-75 duration-700 '>
      <img className=' rounded-[20vw] aspect-square object-cover mt-4'
            src={ thisUser.avatar === ""
            ? 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
            : `http://localhost:4000/${thisUser.avatar}`}/>
      <p className='text-[#EFEFEF] '> {thisUser.name}</p>

      </div>
</Link>
      :
      <Link className='text-[#EFEFEF] text-[15px] hover:text-[#F66B0E]  hover:scale-110  transition' to="/LoginSignup">Login / Signup </Link>

    }
    </div>


    </div>
  

  )
}
