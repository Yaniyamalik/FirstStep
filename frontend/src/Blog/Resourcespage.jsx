import React from 'react'
import { useParams } from 'react-router-dom'
import  ResourcesIdeas from "./data2.jsx"
import "./Resourcepage.css"
 export const Resourcepage = () => {
    const {id}=useParams();

    const resourcepost =ResourcesIdeas.find((post)=>post.id==parseInt(id))
     if(!resourcepost){
        return <p>Resource not found</p>
     }
  return (
    <div className='reso-details'>
        <div className="reso-details-header">
     <h1 className='reso-detail-h1'>{resourcepost.title}</h1>
     <br></br>
     <img src={resourcepost.image}  className='reso-detail-img'/>
     </div>
     <h3>{resourcepost.description}</h3>
     <br></br>
     <div dangerouslySetInnerHTML={{ __html: resourcepost.about }} />
     <br></br>
    </div>
  )
}