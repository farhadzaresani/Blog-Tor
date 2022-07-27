import React, { useState } from 'react'
import { useEffect } from 'react'
import Loading from '../Components/Loading'
import Users from '../Components/AllUsers/Users'

export default function AllUsers() {

  const [usersData,setUsersData]=useState()
  const [loading,setLoading]=useState(true )

useEffect(()=>{
  fetch('http://localhost:4000/user/',{
    method:'GET',
    headers: { 'Content-Type': 'application/json' },  
  })
  .then(response => response.json())
  .then(data => {
    setUsersData(data)
    setLoading(false)
    console.log(data)
  })
  .catch((error) => {
    console.error('Error:', error);
  })
},[])

if (loading) {return <Loading/>}

  return (
    <>
    <Users
    usersData={usersData}
    />
    </>
  )
}
