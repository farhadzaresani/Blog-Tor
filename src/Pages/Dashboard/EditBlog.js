import React, { useState } from 'react'
import { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Cookies from 'universal-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Loading from '../../Components/Loading';

export default function EditBlog() {

  const navigate=useNavigate()
  const editorRef = useRef(null);
  const cookies = new Cookies();
  const token = cookies.get('ut')
  const [lastData,setLastdata]=useState()
  const [newTitle ,setNewTitle]=useState()
  const [newContent ,setNewContent]=useState()
  const params=useParams()
  const [loading, setLoading]=useState(true)
 


const notify= () => toast.success('Your blog has upadeted!', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });

  useEffect(()=>{
    fetch(`http://localhost:4000/blog/single-blog/${params._id}`,{
      method:'GET',
      headers: { 'Content-Type': 'application/json' },    
    })
    .then(response => response.json())
    .then(data => {
      setLastdata(data)
      console.log(data.title)
      setNewTitle(data.title)
      setNewContent(data.content)
      setLoading(false)
      })
    .catch((error) => {
      console.error('Error:', error);
    })
  },[]) 



  const editBlog =() =>{
 
    console.log(newTitle)
    console.log(params._id)
    console.log(editorRef.current.getContent())
    fetch('http://localhost:4000/blog/edit',{
            method:'POST',
            headers: { 'Content-Type': 'application/json', auth: `ut ${token}`  },
            body: JSON.stringify({
              blogId: params._id,
              data: {
                title: newTitle,
                content: (editorRef.current.getContent()),
                imgurl: 'https://www.safecare-project.eu/wp-content/uploads/2020/02/Document-Vector.jpg'
              }
            })
          })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if(data) notify()
        navigate(`/AllBlogs`, { replace: true });
                    })
      .catch((error) => {
        console.error('Error:', error);
                     });
    }
    
    
    if(loading)return(<Loading/>)
    
  return (
    <div className='flex flex-col items-center bg-[#3D3C42] space-y-10 h-[80vw]'>
      <h1 className='font-extrabold text-[#FEFBF6] text-[100px]'>Edit Blog</h1>
<div>

      <div className='flex items-start space-x-6 '>
       <input className='border-2 w-[80vw] text-[30px] rounded-lg' value={newTitle}  placeholder='Title' onChange={(e) => setNewTitle(e.target.value)}type='text'></input>
      </div>


    <Editor 
      initialValue={newContent}
      onInit={(evt, editor) => editorRef.current = editor}
      init={{
        height: 300,
        width:'80vw',
        menubar: false,
        
        toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
      />
      </div>
    <button  className='bg-blue-500 text-[30px] text-white w-[40vw]  rounded-xl' onClick={()=>editBlog(newTitle,newContent)}>Submit</button>
  </div>
  )
}
