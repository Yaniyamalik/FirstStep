import React,{useState} from 'react'
import { useParams } from 'react-router-dom'
import blogIdeas from './data'
import "./itempage.css"
 export const Itempage = () => {
    const {id}=useParams();
    
    const blogpost=blogIdeas.find((post)=>post.id==parseInt(id))
     if(!blogpost){
        return <p>Blog not found</p>
     }
     const handleLike = () => {
      setLiked(!liked);
     };
  return (
    <div className='blog-details'>
        <div className="blog-details-header">
     <h1 className='blog-detail-h1'>{blogpost.title}</h1>
     <br></br>
     <img src={blogpost.image}  className='blog-detail-img'/>
     </div>
     <h3>{blogpost.description}</h3>
   
     <br></br>
     
     <div dangerouslySetInnerHTML={{ __html: blogpost.about }} />
     <br></br>
    </div>
  )
}
