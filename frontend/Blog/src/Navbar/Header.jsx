import React from 'react'
import "./Header.css"
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { RiLoginCircleFill } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { GrResources } from "react-icons/gr";
import { TbWriting } from "react-icons/tb";
import image1 from "../public/logo.png"
function Header() {
  return (
    <div className='header'>
      <div className='container'>
        <img src={image1}className='head-logo'/ >
        <Link to = "/"> 
        <p><IoHomeOutline />  Home</p></Link>
        <Link to = "/blog"> 
        <p> <TbWriting />Blog</p></Link>
        <Link to = "/resouces"> 
        <p> <GrResources />Resources</p></Link>
        <Link to = "/login"> 
        <p> <RiLoginCircleFill />Login</p></Link>
        </div>
    </div>
  )
}

export default Header