import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import { selectUser, setuser } from '../../Components/userReducer'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import MyEditProfile from './MyComponents/MyEditProfile';

  export default function EdirProfile() {
  
    const thisUser=useSelector(selectUser)
  const cookies = new Cookies()
  const token = cookies.get('ut')
  const [newName,setNewName]=useState(thisUser.name)
  const [newBio,setNewBio]=useState(thisUser.bio)
  const [file,setFile]=useState(null)

 
    console.log(newName)
    console.log(thisUser.bio)

const successData=()=> toast.success('Your profile has updated!', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });
const successAvatar=()=> toast.success('Your profile picture has updated!', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });
  const badInput = () =>toast.error('Somthing went wrong!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });





const editProfile =() =>{

    fetch('http://localhost:4000/user/edit',{
      method:'POST',
      headers: { 'Content-Type': 'application/json',auth: `ut ${token}`  },
      body : JSON.stringify({ name: newName,bio:newBio  })
  })  
  .then(response => response.json())
  .then(data => {
    console.log('Success:',data);
    if(data.msg!=='ok')return badInput()
    
    successData()
  })
  .catch((error) => {
    console.error('Error:', error);
    
  });
  }

  const submitAvatar = async () => {
    try { 
      if (!file) return
      console.log(file)
      const formData = new FormData()
      formData.append('avatar', file)
      console.log(formData)
      fetch('http://localhost:4000/user/update-avatar', {
        method: 'POST',
        headers: {
          auth: `ut ${token}` 
        },
      body: formData
      }).then(res => {
        console.log(res)
        return res.json()
      }).then(data => {
        console.log(data)
        successAvatar()
      })
    } catch (error) {
      console.log('lol')
    }
  }

  return (
    <MyEditProfile
    newName={newName}
    setNewName={setNewName}
    newBio={newBio}
    setNewBio={setNewBio}
    editProfile={editProfile}
    submitAvatar={submitAvatar}
    setFile={setFile}
    file={file}
    
    />
    // <div className='flex flex-col pb-10 justify-center items-center bg-[#3D3C42]'>
    //         <form onSubmit={(e)=>e.preventDefault()} className='  flex justify-center items-center flex-col'>
    //             <h1 className='text-[20vw] lg:text-[7vw] fond-extrabold  text-[#FEFBF6] '>Edit Profile</h1>
    //       <div className='flex justify-center items-center'>   
    //           <div className= ' bg-[#FEFBF6] shadow-xl  w-[50vw]  flex flex-col items-center rounded-[30px]' >
    //             <div className=''>
    //       <div className='m-4'>
    //     <img className=' rounded-[20vw] w-[120px] m-4 aspect-square object-cover'
    //           src={ thisUser.avatar === ""
    //         ? 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
    //        : `http://localhost:4000/${thisUser.avatar}`}/>
               
    //         <input onChange={(e) => setFile(e.target.files[0])} className='' type="file" id="img" name="img" accept="image/*"/>
    //       </div>
    //           <button onClick={submitAvatar} className='  bg-blue-500 hover:scale-110 hover:shadow-2xl transition delay-150 duration-300  w-[100px] h-10 font-bold text-white flex justify-center items-center rounded-xl shadow-lg' >
    //             Upload</button>
    //             </div>
    //             <div className=' flex flex-col justify-center items-center my-10 space-y-5 '>
    //             <div className=' text-[20px] flex items-center flex-col'>

    //             <input onChange={(e) => setNewName(e.target.value)} placeholder='New Name' defaultValue={thisUser.name} type='text'  className='border-b-2 w-[35vw] '/>
    //             </div>
    //             <div className='space-x-6 text-[3vw] justify-center items-center flex flex-col'>
    //             <textarea onChange={(e) => setNewBio(e.target.value)} defaultValue={thisUser.bio}  placeholder="Bio:" className='border-2   '></textarea>
    //             </div>
    //             <button onClick={() => editProfile(newName,newBio)}  className=' mt-5 bg-blue-500 w-[200px] hover:scale-110 hover:shadow-2xl transition delay-150 duration-300 h-14 text-[4vw] font-bold text-white flex justify-center items-center rounded-xl shadow-lg'>Submit</button>
    //             </div>
    //           </div> 
    //       </div>
    //     </form >
    // </div>
  )
}
