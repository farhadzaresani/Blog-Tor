import React from 'react'
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function MyBlog(props) {

  return (
    <div className='bg-[#3D3C42] flex flex-col justify-center pb-[30vw] items-center '>
    <h1 className='text-[10vw] font-extrabold text-[#FEFBF6]  '>My Blogs</h1>
        <div className='flex flex-wrap   rounded-lg shadow-inner pt-10  text-[#FEFBF6]   justify-center items-center '>
    {props.myBlogs=='' ?<div className='text-black font-bold opacity-30 text-5xl'>No blog</div>
        :
      props.myBlogs.map((item,i)=>{
        const submit = () => {
          confirmAlert({
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: ()=>props.deleteBlog(item._id)
              },
              {
                label: 'No',
              }
            ]
          });
        };
        return(
<div key={i}>       
          <div  className=' '>
          <div className= 'cursor-pointer hover:scale-110  transition delay-75 duration-700 flex flex-col items-center '>       
          <Link className='w-[30vw]  flex justify-center' to={`/SingleBlog/${item._id}`}>
        <img className='rounded-md' src={item.imgurl} alt="img"/>
          </Link>
            <div className='flex space-x-5 text-[10px] lg:space-x-24'>
             <button className='bg-red-500 lg:w-[4vw]  hover:scale-110 rounded-md' onClick={()=>submit(i)} >Delete</button>
             <Link to={`/Dashboard/EditBlog/${item._id }`} className='bg-[#A6D1E6] lg:w-[4vw] hover:scale-110 rounded-md flex justify-center items-center' > Edit</Link>
            </div>
          <p> {item.title}</p>          
        </div>    
    </div>
    </div>  
    )
    })   
    }
    </div> 
    </div>
  )
}
