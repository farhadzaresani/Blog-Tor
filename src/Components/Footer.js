import React from 'react'
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <div className='border-t-[1px] border-[#A6D1E6] bg-[#7F5283] '>
    <div className='flex items-center justify-end space-x-14 h-[10vw] mr-20'>
        <Link className='text-[#FEFBF6] ' to="/HomePage">AboutUs </Link>
        <Link className='text-[#FEFBF6]  ' to="/ConstactUs">ContactUs </Link>
        <Link className='text-[#FEFBF6]  ' to="/HomePage">Home </Link>
       
</div>

    </div>
  )
}
