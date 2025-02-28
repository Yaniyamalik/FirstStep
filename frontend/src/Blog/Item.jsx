import React from 'react'

import "./item.css"
import blogIdeas from './data'; 
import { BrowserRouter as Router, Link,Routes, Route } from 'react-router-dom';

const Index = ({ blogPosts }) => {
  return (
    <div className="blog-container">
      {blogPosts.map((post) => (
        <div key={post.id} className="blog-post">
          <img src={post.image} alt={post.title} className="blog-image" />
          <h2 className="blog-title">{post.title}</h2>
          <p className="blog-description">{post.description}</p>  
          <li key={post.id}>
          <Link to={`/blog/${post.id}`}>
          { <button className='blog-button'>Read More</button>}
        </Link>
      </li>   
        </div>
      ))}
    </div>
  );
};

export default Index;

