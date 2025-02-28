import { useState } from 'react'
import { BrowserRouter as Router, Link,Routes, Route } from 'react-router-dom';

import Home from "./pages/Home"
import Blog from "./pages/Blog"
import Login from "./pages/Login"
import Header from "./Navbar/Header"
import Footer from "./Navbar/Footer"
import Resources from "./pages/Resources.jsx"
import blogIdeas from './Blog/data';
import { Resourcepage } from './Blog/Resourcespage.jsx';
import { Itempage } from './Blog/Itempage';
import { Signup } from './pages/Signup.jsx';


function App() {
 

  return (
    <Router>
        <Header></Header>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/resouces" element={<Resources />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/blog/:id" element={<Itempage />} />
        <Route path="/resouces/:id" element={<Resourcepage />} />
        </Routes>
        <Footer></Footer>
      </Router>
      
  )
}

export default App
