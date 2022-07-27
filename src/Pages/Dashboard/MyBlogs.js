import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import { useEffect } from 'react'
import Loading from '../../Components/Loading'
import MyBlog from './MyComponents/MyBlog'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function MyBlogs() {

  const [myBlogs,setMyBlogs]=useState()
  const [loading,setLoading]=useState(true )
  const cookies = new Cookies()
  const token = cookies.get('ut')
  
  const successDelete=()=>toast.info('This blog is deleted!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

const getAllBlogs=()=>{
  fetch('http://localhost:4000/blog/my-blogs',{
    method:'GET',
    headers: { 'Content-Type': 'application/json' , auth: `ut ${token}` },
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    setMyBlogs(data)
    setLoading(false) 
  })
  .catch((error) => {
    console.error('Error:', error);
  })
 }

const deleteBlog =(blogId) =>{
  fetch('http://localhost:4000/blog/delete',{
    method:'POST',
    headers: { 'Content-Type': 'application/json', auth: `ut ${token}`  },
    body : JSON.stringify({ blogId }) 
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      if (data.msg === 'ok') {
        successDelete()
        getAllBlogs()
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  useEffect (() => {
    getAllBlogs()
  },[])

  if (loading) {return <Loading/>}

  return (
<MyBlog
myBlogs={myBlogs}
deleteBlog={deleteBlog}
/>
  )
}
