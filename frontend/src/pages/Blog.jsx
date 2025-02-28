import React from 'react'
import blogIdeas from '../Blog/data.jsx'
import  Index from "../Blog/Item.jsx"
import image2 from "../public/blog-theme.png"
import "./Blog.css"
function Blog() {
  return (
    <div className="home-blog">   
    <div className="home-blog-content">
          <img src={image2} className='home-blog-image'/>
          <div className="home-blog-post">
          <Index blogPosts={blogIdeas} /></div>
          </div>
          </div>
  )
}

export default Blog