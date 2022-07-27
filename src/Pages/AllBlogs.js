import React, { useState } from 'react'
import { useEffect } from 'react'
import Loading from '../Components/Loading'
import Blogs from '../Components/AllBlogs/Blogs'

export default function AllBlogs() {

  const [blogData,setBlogsData]=useState()
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    fetch('http://localhost:4000/blog',{
      method:'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
      setBlogsData(data)
      setLoading(false)
      console.log(data)
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  },[])

  if (loading) {return<Loading/>}

  return (
    <Blogs
    blogData={blogData}
    />
  )
}
