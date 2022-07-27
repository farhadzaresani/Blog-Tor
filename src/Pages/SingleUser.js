import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import MyBlogs from './Dashboard/MyBlogs'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings';
import Moment from 'react-moment';
import Loading from '../Components/Loading'
import NotFound from '../Components/NotFound'
export default function singleUser() {
  
  const params=useParams()
  const [loading,setLoading]=useState(true )
  const [userData, setUserdata]=useState()
  const [userBlogs, setUserBlogs]=useState()
  // const [userId, setUserId]=useState()
  console.log(params._id)





  useEffect(()=>{
    

    fetch(`http://localhost:4000/user/singleUser/${params._id}`,{
      method:'GET',
      headers: { 'Content-Type': 'application/json' },
      
    })
    .then(response => response.json())
    .then(data => {
      setUserdata(data)
      console.log(data.msg)
      
      fetch(`http://localhost:4000/blog/by-user`,{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:  JSON.stringify({_id:params._id })  
        },
        )
      .then(response => response.json())
      .then(data => {
        setUserBlogs(data)
        setLoading(false)
        console.log(data)
        
      })
      .catch((error) => {
        console.error('Error:', error);
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    })   
  },[])
   
      if (loading) {
        return <Loading/>
      }
      if(userData.msg)return( <NotFound/>)
      console.log(userData)

  return (
<div className='flex flex-col justify-center items-center space-y-10 text-[#FEFBF6] bg-[#3D3C42]'>

  <div className=' mt-10 shadow-xl w-[80vw]  flex flex-col rounded-2xl justify-center '>
     <div className='flex flex-col space-y-8 ml-10'>
     <img className=' rounded-[20vw] aspect-square object-cover w-[20vw] mt-4'
            src={ userData.avatar === ""
            ? 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
            : `http://localhost:4000/${userData.avatar}`}/>
           
      <div className='flex  space-x-2'>
      <h2 className='text-4xl'> { userData.name } </h2>
      </div>
      <div className='flex space-x-2'>
      <h1 className='font-extrabold text-xl' >UserName:</h1><h2 className='text-xl'>{userData.username}</h2>
      </div>
      <div className='flex space-x-2'>
      <StarRatings
          rating={userData.averageScore}
          starRatedColor="yellow"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="5px"
          name='rating'
          />
      </div>
      <div className='flex space-x-2 '>
      <h2 className='text-xl'>{userData.bio}</h2>
      </div>
      <div className='opacity-30 flex space-x-1'>
        <div>
      Join At:  
        </div>
      <Moment format="YYYY/MM/DD">
                 {userData.updatedAt}
            </Moment>
      </div>
     </div>
  </div>

<div>{userData.name}'s Blogs:</div> 

    <div className='flex flex-wrap'  >


     {userBlogs=='' ?<div className='text-black font-bold opacity-30 text-5xl'>No blog</div>
        :
       userBlogs.map((item,i)=>{
         return(
           <Link key={i} to={`/SingleBlog/${item._id}`}>
      <div  className='m-10'>
   

    <div className= '  shadow-xl cursor-pointer hover:shadow-2xl hover:scale-110  transition delay-75 duration-700  w-[17vw] h-[17vw] flex flex-col items-center rounded-[30px]'>
      <img className='w-[12vw] rounded-full aspect-square object-cover' src={item.imgurl} alt="img"/>
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
