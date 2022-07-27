import React from 'react'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings';

export default function TopBlogs(props) {
  return (
    <div className='my-20 h-[30vw] flex flex-col  text-[#FEFBF6]  rounded-lg shadow-inner'>

      <div className='font-bold '>
          <div className='m-10'>Top Blogs</div>
        </div>
      <div  className=' flex flex-wrap  justify-center items-center space-x-[10vw] '>
      {
        props.topBlogs=='' ?<div className='text-black font-bold opacity-30 text-5xl'>No bLogs</div>
        :
  props.topBlogs.map((item,i)=>{
    return(
      
      <div  key={i} className=''>
      
      <Link  to={`/SingleBlog/${item._id}`}>
   

    <div className= 'cursor-pointer hover:shadow-xl rounded-xl hover:scale-110 w-[17vw] transition delay-75 duration-700   flex flex-col items-center '>
      <img className='w-[12vw] rounded-lg' src={item.imgurl} alt="img"/>
      <p> {item.title}</p>
      <StarRatings 
          rating={item.averageScore}
          starRatedColor="yellow"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="5px"
          name='rating'
          />

    </div>

 

</Link>
</div>
      )
    })
    
  }
      </div>
  </div>
  )
}
