import React from 'react'
import { Link } from 'react-router-dom'
export default function Blogs(props) {
  return (
    <div className='bg-[#3D3C42] flex flex-col  items-center '>
    <h1 className='text-[100px] fond-extrabold text-[#FEFBF6]  '>Blogs</h1>
       
    
        <div className='flex flex-wrap space-x-10   rounded-lg shadow-inner mb-10  text-[#FEFBF6]  w-[80vw] justify-center items-center '>
    
    { props.blogData=='' ?<div className='text-black font-bold opacity-30 text-5xl'>No Blog</div>
            :
      props.blogData.map((item,i)=>{
        return(
          <Link className=' flex justify-center' key={i} to={`/SingleBlog/${item._id}`}>
          <div  className='my-10 '>
       
          <div className= 'cursor-pointer  hover:scale-110 w-[17vw] transition delay-75 duration-700   flex flex-col items-center '>
        
        <img className='rounded-md' src={item.imgurl} alt="img"/>
          <p> {item.title}</p>
          <p>{item.bio}</p>
    
        </div>
    
     
    </div>
          </Link>
    
    )
    })
    
    }
    </div>
    
    
          </div>
  )
}
