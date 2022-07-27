import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import StarRatings from 'react-star-ratings';
import Cookies from 'universal-cookie';
import Loading from '../Components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import NotFound from '../Components/NotFound';

export default function SingleBlog() {
  const params=useParams()
  const [loading,setLoading]=useState(true )
  const [blogData, setBlogData]=useState()
  const [rate,setRate]=useState()
  const [text,setText]=useState()
  const [comments,setComments]=useState()
  const cookies = new Cookies();
  const token = cookies.get('ut')

 
  // useEffect(()=>{

  //   const fetchBlog = async () => {
  //     const res = await fetch(`http://localhost:4000/blog/single-blog/${params._id}`,{
  //       method:'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     })
  //     const data = await res.json()
  //     setBlogData(data)
  //     setLoading(false)
  //   }
  //   fetchBlog()
  // },[])


  const Error = () =>toast.error('Somthing is wrong!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });


  const getAllComment=()=>{

    fetch(`http://localhost:4000/comment/by-blog/${params._id}`,{
      method:'GET',
      headers: { 'Content-Type': 'application/json' },
      
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)

      setComments(data)
      setLoading(false)
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  }



useEffect(()=>{
  // if(params._id==undefined)return( <div>no</div>, setLoading(false))
  fetch(`http://localhost:4000/blog/single-blog/${params._id}`,{
    method:'GET',
    headers: { 'Content-Type': 'application/json' },    
  })
  .then(response => response.json())
  .then(data => {

    
    setBlogData(data)
    getAllComment()

  })
  .catch((error) => {
    console.error('Error:', error);
    
  })
},[])  


  useEffect(()=>{
    if (rate != undefined) {
      fetch('http://localhost:4000/blog/submit-rate',{   
        method:'POST',
        headers: { 'Content-Type': 'application/json'  ,auth: `ut ${token}`},
        body : JSON.stringify({   
        blogId: params._id, 
        score: rate})
      })    
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        console.log(data)
        setRate(data.averageScore)
       
        
      })
      .catch((error) => {
        console.error('Error:', error);
     });
    }
  },[rate])
  
  const submitComment =() =>{
   
   

    fetch('http://localhost:4000/comment/submit',{
      method:'POST',
      headers: { 'Content-Type': 'application/json', auth: `ut ${token}`  },
      body : JSON.stringify({
        text: text,
        blogId: params._id}) 
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if(data.msg==="bad request: bad inputs")return Error()
    
       
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      getAllComment()
  }

  function createMarkup() {
    return {__html: blogData.content};
  }



console.log(blogData)

if (loading) return <Loading/>
if(blogData.msg)return( <NotFound/>)
  return (
    <div className='flex flex-col justify-center items-center bg-[#3D3C42] ' >
    <div className=' shadow-xl w-[90vw]  flex flex-col mt-10  rounded-2xl justify-center '>     
     <div className='flex flex-col  text-[#FEFBF6] space-y-8 '>
     <img className='w-[12vw] rounded-full border-[2px] border-[#A6D1E6]' src={blogData.imgurl} alt="img"/>
      <div className='flex  space-x-2'>
      <h1 className='font-extrabold text-4xl'></h1><h2 className='text-4xl'> { blogData.title } </h2>
      </div>
      <div className=''>
      <h1 className='text-xl flex' ></h1><h2 dangerouslySetInnerHTML={{__html: blogData.content}} className='text-xl'/>
      </div>
     </div>
<div className='m-10'>
     <StarRatings
          rating={blogData.averageScore}
          starRatedColor="yellow"
          changeRating={setRate}
          numberOfStars={5}
          starDimension="20px"
          starSpacing="5px"
          name='rating'
          />
          </div>
    </div>

    {token 
      ? 
<form className='flex space-x-2   mt-8' >
    <input  onChange={(e)=>setText(e.target.value)} type="text" placeholder='Enter Your Comment' className='bg-[#FEFBF6] rounded-lg w-[79vw] h-[3vw]'></input>
    <button className='bg-blue-500 w-[10vw] text-[#FEFBF6] font-extrabold rounded-lg ' type='submit' onClick={()=>submitComment(text)} >Submit</button>
</form > 
:''
}
<div className='bg-[#FEFBF6] m-2 rounded-md w-[90vw] flex flex-col'>
{ comments=='' ?<div className='text-black flex justify-center font-bold opacity-30 text-xl'>no comments yet be the first one</div>
        :
  comments.map((comment,i)=>{
    return(
      <div className=' flex items-center' key={i}>
        <img className=' rounded-[20vw] w-[3vw] aspect-[4/4] m-2'
            src={ comment.user.avatar === ""
            ? 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
            : `http://localhost:4000/${comment.user.avatar}`}/>
        <h3 className='font-bold'>{comment.user.name}: </h3>
        <p className='border-b-[2px]'>{comment.text}</p>
      </div>
)
})
}
</div>
          </div>
  )
  }