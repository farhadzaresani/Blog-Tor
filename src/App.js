import{BrowserRouter,Route,Routes, useNavigate,} from 'react-router-dom'
import WebLayout from './WebLayout'
import HomePage from './Pages/HomePage'
import AllBlogs from './Pages/AllBlogs'
import AllUsers from './Pages/AllUsers'
import SingleUser from './Pages/SingleUser'
import SingleBlog from './Pages/SingleBlog'
import Profile from './Pages/Profile'
import LoginSignup from './Pages/LoginSignup'
import ContactUs from './Pages/ContactUs'
import Dashboard from './Pages/Dashboard/Dashboard'
import CreatBlog from './Pages/Dashboard/CreatBlog'
import MyBlogs from './Pages/Dashboard/MyBlogs'
import EditProfile from './Pages/Dashboard/EditProfile'
import EditBlog from './Pages/Dashboard/EditBlog'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setuser } from './Components/userReducer'
import './App.css';
import Cookies from 'universal-cookie'
import { ToastContainer  } from 'react-toastify';
import NotFound from './Components/NotFound'

export default function App() {
  
  const cookies = new Cookies()
  const token = cookies.get('ut')
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()

 



  useEffect (() => {
    if(!token) return
          fetch('http://localhost:4000/user/me',{
            method:'POST',
            headers: { 
              'Content-Type': 'application/json',
              auth: `ut ${token}` 
            },
            body :'{}',
          })
          .then(response => response.json())
          .then(data => {
          
            dispatch(setuser(data))
            console.log(data)
            setLoading(false)
          })
          .catch((error) => {
            console.error('Error:', error);
          })
        },[]);



        // if (loading){return<Loading/>}


  return (
    <>
<ToastContainer />
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<WebLayout />}>
        <Route path='/'element={<HomePage/>}/>
        <Route path='AllBlogs'element={<AllBlogs/>}/>
        <Route path='singleUser/:_id'element={<SingleUser/>}/>
        <Route path='AllUsers'element={<AllUsers/>}/>
        <Route path='SingleBlog'element={<SingleBlog/>}/>
        <Route path='Profile'element={<Profile/>}/>
        <Route path='ContactUs'element={<ContactUs/>}/>
        <Route path='LoginSignup'element={<LoginSignup/>}/>
        <Route path='SingleBlog/:_id'element={<SingleBlog/>}/>
      </Route>

      <Route path='/Dashboard/'element={<Dashboard/>}>
        <Route path='CreatBlog'element={<CreatBlog/>}/>
        <Route path='MyBlogs'element={<MyBlogs/>}/>
        <Route path='EditBlog/:_id'element={<EditBlog/>}/>
        <Route path='EditProfile'element={<EditProfile/>}/>

      </Route>
      <Route path="*" element={<NotFound/>} />
    </Routes>
  </BrowserRouter>
    </>
  );
}


