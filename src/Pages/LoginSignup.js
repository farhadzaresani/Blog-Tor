import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from '../Components/SignupLogin/Signup';
import Login from '../Components/SignupLogin/Login';

export default function LoginSignup() {

const[name, setName]= useState()
const[userName, setUserName]= useState()
const[password, setPassword]= useState()
const[enterUserName, setEnterUserName]= useState()
const cookies = new Cookies();

const notify = () =>toast.error('Username or Password is incorect!', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });

const signUpError = () =>toast.error('this username already exists!', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });

const badInput = () =>toast.error('You have to fill all inputs!', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });

const SignUp =() =>{
  fetch('http://localhost:4000/user/signup',{
    method:'Post',
    headers: { 'Content-Type': 'application/json' },
    body : JSON.stringify({ name: name,username:userName })
                  })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if (data.token) {
          cookies.set('ut',data.token, {path: '/'});
          window.location.assign(`http://localhost:3000/Dashboard/MyBlogs`)
        } 
        if(data.msg==='this username already exists in the database') {
          signUpError()
        }
        if(data.msg==='bad input') {
          badInput()
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      }

const LogIn =(e) =>{
  fetch('http://localhost:4000/user/login',{
    method:'Post',
    headers: { 'Content-Type': 'application/json' },
    body : JSON.stringify({ username: enterUserName, password:password })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      if (data.token){
        // dispatch(setuser(data))
        cookies.set('ut',data.token, {path: '/'});
        // navigate("/Dashboard/MyBlogs", { replace: true });
        window.location.assign(`http://localhost:3000/Dashboard/MyBlogs`)
                    }
      if(data.msg==='bad request: no such user exists') notify()
      if(data.msg==='bad inputs') badInput()
                })
                  }

  return (
    <div className='bg-[#3D3C42] flex flex-col lg:flex-row justify-center items-center text-slate-600'>
<Signup
setUserName={setUserName}
userName={userName}
setName={setName}
name={name}
SignUp={SignUp}
  />
<Login
setEnterUserName={setEnterUserName}
enterUserName={enterUserName}
setPassword={setPassword}
password={password}
LogIn={LogIn}
/>
    </div>
  )
}
