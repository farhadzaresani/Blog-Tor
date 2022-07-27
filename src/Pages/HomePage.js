import React, { useState } from 'react'
import { useEffect } from 'react'
import Loading from '../Components/Loading'
import TopWriters from '../Components/HomePage/TopWriters';
import TopBlogs from '../Components/HomePage/TopBlogs';

export default function HomePage() {

  const [topUsers, setTopUsers]=useState()
  const [topBlogs, setTopBlogs]=useState()
  const [loading ,setLoading]=useState(true)

  useEffect(()=>{
    fetch('http://localhost:4000/user/top-users',{
      method:'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
      setTopUsers(data)
      console.log(data)
      fetch('http://localhost:4000/blog/top-blogs',{
        method:'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => response.json())
      .then(data => {
        setTopBlogs(data)
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

if (loading) {return <Loading/>}

  return (
  <div className=' bg-[#3D3C42] text-[#3D3C42] flex justify-center  ' >
  <div className='my-10 flex flex-col w-[75vw] '>

<TopWriters
topUsers={topUsers}
/>

<TopBlogs
topBlogs={topBlogs}
/>

  </div>
  </div>
  )
}
