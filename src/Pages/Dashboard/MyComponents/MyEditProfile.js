import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectUser } from '../../../Components/userReducer'

export default function MyEditProfile(props) {

  const [amqezi, setAmqezi] = useState('')

  const thisUser = useSelector(selectUser)

  useEffect(() => {
    if (thisUser)  {
      const x = thisUser.avatar === ""
        ? 
        'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
        :
        `http://localhost:4000/${thisUser.avatar}`
      setAmqezi(x)

    }
  }, [thisUser])

  useEffect(() => {
    if (props.file) {

      const fr = new FileReader()

      fr.onload = async function(e) {

        setAmqezi(e.target.result)
      }

      fr.readAsDataURL(props.file)

      setAmqezi("https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png")
    }
  }, [props.file])


  return (
    <div className='flex flex-col pb-10 justify-center items-center bg-[#3D3C42]'>
    <form onSubmit={(e)=>e.preventDefault()} className='  flex justify-center items-center flex-col'>
        <h1 className='text-[20vw] lg:text-[7vw] fond-extrabold  text-[#FEFBF6] '>Edit Profile</h1>
  <div className='flex justify-center items-center'>   
      <div className= ' bg-[#FEFBF6] shadow-xl  w-[50vw]  flex flex-col items-center rounded-[30px]' >
        <div className=''>
  <div className='m-4'>
    <img className=' rounded-[20vw] w-[120px] m-4 aspect-square object-cover'
      src={amqezi}
    />
       
    <input onChange={(e) => props.setFile(e.target.files[0])} className='' type="file" id="img" name="img" accept="image/*"/>
  </div>
      <button onClick={props.submitAvatar} className='  bg-blue-500 hover:scale-110 hover:shadow-2xl transition delay-150 duration-300  w-[100px] h-10 font-bold text-white flex justify-center items-center rounded-xl shadow-lg' >
        Upload</button>
        </div>
        <div className=' flex flex-col justify-center items-center my-10 space-y-5 '>
        <div className=' text-[20px] flex items-center flex-col'>

        <input onChange={(e) => props.setNewName(e.target.value)} placeholder='New Name' value={props.newName} type='text'  className='border-b-2 w-[35vw] '/>
        </div>
        <div className='space-x-6 text-[3vw] justify-center items-center flex flex-col'>
        <textarea onChange={(e) =>props.setNewBio(e.target.value)}   placeholder="Bio:" value={props.newBio} className='border-2   '></textarea>
        </div>
        <button onClick={() => props.editProfile(props.newName,props.newBio)}  className=' mt-5 bg-blue-500 w-[200px] hover:scale-110 hover:shadow-2xl transition delay-150 duration-300 h-14 text-[4vw] font-bold text-white flex justify-center items-center rounded-xl shadow-lg'>Submit</button>
        </div>
      </div> 
  </div>
</form >
</div>
  )
}
