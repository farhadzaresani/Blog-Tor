import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../../Components/SideBar'
import Cookies from 'universal-cookie'  

export default function Dashboard() {

  const navigate=useNavigate()
  const cookies = new Cookies()
  const token = cookies.get('ut')

  useEffect (() => {
    if(!token) {
      return navigate("/loginSignup", { replace: true })
    }
  },[]);

  return (
 <>
    <SideBar/>
    <Outlet/>
 </>


  )
}
