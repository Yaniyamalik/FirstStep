import React from 'react'
import PropTypes from 'prop-types'
import ResourcesIdeas from './data2'
import { BrowserRouter as Router, Link,Routes, Route } from 'react-router-dom';
import "./Resourceitem.css"
const Resourceitem = ({resourceidea}) => {
  return (
   <div className="reso-item">
    {resourceidea.map((post)=>(
        <div className="reso-item-container">
        <img src={post.image} className='reso-item-img'/>
        <h3 className='reso-item-title'>{post.title}</h3>
        <p className='reso-item-description'>{post.description}</p>
        <li key={post.id}>
        <Link to={`/resouces/${post.id}`}>
          { <button className='reso-item-button'>Read More</button>}
        </Link>
        </li>
        </div>
    ))}
   </div>
  )
}

Resourceitem.propTypes = {}

export default Resourceitem