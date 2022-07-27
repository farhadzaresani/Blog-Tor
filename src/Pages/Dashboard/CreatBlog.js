import React, { useState } from 'react'
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

export default function CreatBlog() {
  const navigate=useNavigate()
  const editorRef = useRef(null);
  const cookies = new Cookies();
  const token = cookies.get('ut')
  const [title ,setTitle]=useState()
  const [content ,setContent]=useState()

  const creatBlog =() =>{

    fetch('http://localhost:4000/blog/write',{
      method:'POST',
      headers: { 'Content-Type': 'application/json', auth: `ut ${token}`  },
      body : JSON.stringify({
        title: title,
        content: (editorRef.current.getContent()),  
        imgurl: 'https://www.safecare-project.eu/wp-content/uploads/2020/02/Document-Vector.jpg'}) 
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        navigate(`/AllBlogs`, { replace: true });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className='flex flex-col pb-10 items-center bg-[#3D3C42] space-y-6'>
      <h1 className='font-extrabold text-[#FEFBF6] text-[20vw] lg:text-[10vw] '>Create Blog</h1>
<div className='border-[2px] border-[#A6D1E6] rounded-lg'>

      <div className='flex items-start space-x-6'>
       <input className='border-2 w-[80vw] text-[30px] rounded-lg' placeholder='Title' onChange={(e) => setTitle(e.target.value)}type='text'></input>
      </div>
    <Editor 
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
    <button  className='bg-blue-500 text-[30px] text-white w-[40vw] rounded-xl' onClick={()=>creatBlog(title,content)}>Create</button>
  </div>
  )
}
