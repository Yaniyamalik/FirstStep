import React from 'react'
import { TfiDashboard } from "react-icons/tfi";
import { MdCreateNewFolder } from "react-icons/md";
import { TbWritingSign } from "react-icons/tb";
import "./Dashboard.css"
export const Dashboard = () => {
  return (
    <div className='dashboard'>
        <h3>Welcome Creator</h3>
        <br></br>
        <h4><TfiDashboard /> &nbsp;Dashboard</h4>
        <br></br>
        <button><MdCreateNewFolder /> &nbsp; Create new Blog</button>
        <br></br><br></br>
        <h4><TbWritingSign /> &nbsp;Posts</h4>
        <br></br>
        <h4><TbWritingSign /> &nbsp;My Profile</h4>
        <br></br>
        <h4><TbWritingSign /> &nbsp;Settings</h4>
        <br></br>
        <h4><TbWritingSign /> &nbsp;Stats</h4>

    </div>
  )
}
