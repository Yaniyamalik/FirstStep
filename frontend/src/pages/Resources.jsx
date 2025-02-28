import React from 'react'
import Resourceitem from '../Blog/Resourceitem'
import ResourcesIdeas from '../Blog/data2'
import image1 from "../public/Resourcetheme.png"
import "./Resources.css"
function Resources() {
  return (
    <div className="resources">
      <div className="reso-img">
      <img src={image1} className='resource-img'/></div>
      <div className="reso-item">
      <Resourceitem resourceidea={ResourcesIdeas}/></div>
    </div>
  )
}

export default Resources