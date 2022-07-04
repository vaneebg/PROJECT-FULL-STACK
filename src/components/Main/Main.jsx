import React from 'react'
import Profile from './Profile/Profile'
import Posts from './Posts/Posts'
import ModalAddPost from './ModalAddPost/ModalAddPost'
import './Main.scss'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllUsers from './AllUsers/AllUsers'

const Main = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");

const handleChange = (e) => {
setText(e.target.value);
if (e.key === "Enter") {
  console.log(e)
  navigate('/search/titlePost/'+ text)

}
};
  return (<div className='main'>
    <div className="buttonsheader">
    <input onKeyUp={handleChange} placeholder="buscar post..." name="text" />
    </div>
       

    <Posts/>
    <div className="right">
    <Profile/>
    <AllUsers/>
    </div>
   
    <ModalAddPost/>
    
    </div>
  )
}

export default Main