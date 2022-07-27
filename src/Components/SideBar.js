import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setuser } from './userReducer';
import { useSelector } from 'react-redux/es/exports';
import { selectUser } from './userReducer';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArticleIcon from '@mui/icons-material/Article';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const dispatch=useDispatch()
  const cookies = new Cookies()
  const thisUser=useSelector(selectUser)

  const logOut = () =>{
    cookies.remove('ut', {path:'/'});
    dispatch(setuser(null))
  }




  return (
    <>  
      {showSidebar ? (
        <button
          className="flex text-4xl text-white cursor-pointer fixed top-3 right-3 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <svg className='w-[2vw] h-[2vw] text-slate-200 hover:text-white hover:scale-110  transition duration-500 delay-100 '><HighlightOffIcon/> </svg>
        </button>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed  z-30 flex items-center cursor-pointer right-10 top-6"
          fill="#7F5283"
          viewBox="0 0 100 80"
          width="40"
          height="40"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}

      <div
        className={`top-0 right-0 w-[20vw] lg:w-[4vw] flex flex-col space-y-45 items-center  bg-[#7F5283] border-l-[2px] border-[#A6D1E6]  text-white fixed h-full z-40  ease-in-out duration-300 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
          {/* <h3 className=" mt-20 flex flex-col text-sm items-center justify-center  font-semibold text-white"> 
        <div>
          Welcome
        </div>
        <div>
        {thisUser.name}
        </div>
        
        </h3> */}
<div className='flex flex-col items-center space-y-20 '>

            <Link className='mt-32 text-slate-200 hover:text-white hover:scale-110 transition duration-500 delay-100' title='Home' to="/"><HomeIcon/> </Link>
            <Link className='text-slate-200 hover:text-white hover:scale-110  transition duration-500 delay-100 ' title='My Blogs' to="/Dashboard/MyBlogs"><ArticleIcon/> </Link>
            <Link className='text-slate-200 hover:text-white hover:scale-110  transition duration-500 delay-100' title='Creat Blog' to="/Dashboard/CreatBlog"><AddBoxIcon/> </Link>
            <Link className='text-slate-200 hover:text-white hover:scale-110  transition duration-500 delay-100' title='Edit Profile' to="/Dashboard/EditProfile"><ContactPageIcon/> </Link>
</div>
            <Link onClick={()=>logOut()} className='mt-[9vw] text-slate-200 hover:text-white hover:scale-110 transition' title='LogOut' to="/"><LogoutIcon/> </Link>

   </div>

     
    </>
  );
};

export default Sidebar;
























// import React  from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import Cookies from 'universal-cookie'
// import { useState } from 'react'
// export default function SideBar() {
//     const navigate=useNavigate()
//     const cookies = new Cookies()
//     const [showSidebar, setShowSidebar] = useState(false);
  

//     const logOut = () =>{
//       cookies.remove('ut');
//     }


// <>
//   {showSidebar ? (
//     <button
//       className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
//       onClick={() => setShowSidebar(!showSidebar)}
//     >
//       x
//     </button>
//   ) : (
//     <svg
//       onClick={() => setShowSidebar(!showSidebar)}
//       className="fixed  z-30 flex items-center cursor-pointer right-10 top-6"
//       fill="#2563EB"
//       viewBox="0 0 100 80"
//       width="40"
//       height="40"
//     >
//       <rect width="100" height="10"></rect>
//       <rect y="30" width="100" height="10"></rect>
//       <rect y="60" width="100" height="10"></rect>
//     </svg>
//   )}

//   <div className="top-0 right-0 w-[35vw] bg-blue-600  p-10 pl-20 text-white fixed h-full z-40">
//     <h3 className="mt-20 text-4xl font-semibold text-white">I am a sidebar</h3>
//   </div>
// </>





//   return (





// <div
//   className={`top-0 right-0 w-[35vw] bg-blue-600  p-10 pl-20 text-white fixed h-full z-40  ease-in-out duration-300 ${
//     showSidebar ? "translate-x-0 " : "translate-x-full"
//   }`}
// >
//   <h3 className="mt-20 text-4xl font-semibold">I am a sidebar</h3>
// </div>





  //   <div className="bg-white z-10 shadow-md flex space-x-[65%] h-[60px] text-[20px] items-center sticky top-0 border-slate-400">
  //   <div className="ml-8 space-x-6 font-extrabold flex">
  //  <Link to='/HomePage'>
  //   <img className='h-8' src={require('../Image/blogtor.png')} alt="img"/>
  //  </Link>
  //     <Link className='text-slate-600 hover:text-slate-700 hover:scale-110  transition' to="/Dashboard/MyBlogs">My Blogs </Link>
  //     <Link className='text-slate-600 hover:text-slate-700 hover:scale-110  transition' to="/Dashboard/CreatBlog">Creat Blog </Link>
  //     <Link className='text-slate-600 hover:text-slate-700 hover:scale-110  transition' to="/Dashboard/EditProfile">Edit Profile </Link>
   
  //   </div>
  //     <Link onClick={()=>logOut()} className='text-slate-600 hover:text-slate-700 hover:scale-110  transition' to="/">LogOut </Link>

  // </div>
