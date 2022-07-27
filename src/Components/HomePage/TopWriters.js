import React from 'react'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings';
export default function TopWriters(props) {
  return (
    <div className='   rounded-lg shadow-inner text-[#FEFBF6] '>

        <div className='font-bold '>
          <div className='m-10'>Top Writers</div>
        </div>
      <div  className=' flex flex-wrap justify-center items-center space-x-[10vw] mt-10  '>
      {  props.topUsers=='' ?<div className='text-black font-bold opacity-30 text-5xl'>No Writers</div>
        :
  props.topUsers.map((item,i)=>{
    return(
      
      <Link key={i} to={`/singleUser/${item._id}`}>
        <div className=' flex'>
        <div className='  cursor-pointer hover:shadow-xl rounded-xl hover:scale-110 w-[17vw]  transition delay-75 duration-700   flex flex-col items-center '>
          <img className=' rounded-lg aspect-square object-cover mt-4'
            src={ item.avatar === ""
            ? 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
            : `http://localhost:4000/${item.avatar}`}/>
          <div className=' flex flex-col w-full'>

          <h1 className='text-[40px]'>{item.name}</h1>
          <StarRatings
          rating={item.averageScore}
          starRatedColor="yellow"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="5px"
          name='rating'
          />
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
