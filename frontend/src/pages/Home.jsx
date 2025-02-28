import React from 'react'
import image1 from "../public/image.png"
import image2 from "../public/blog-theme.png"
import "./Home.css"
import blogIdeas from '../Blog/data.jsx'
import  Index from "../Blog/Item.jsx"
import Blog from './Blog.jsx'
import Resources from './Resources.jsx'
function Home() {
  return (
    <div className='home'>
      <div className="home-container">
     <img src={image1} className='home-image'></img>   
      <Blog/>
      <Resources/>
     </div>
     </div>
    
  )
}

export default Home