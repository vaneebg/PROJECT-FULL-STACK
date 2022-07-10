import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import Profile from './Profile/Profile'
import Posts from './Posts/Posts'
import ModalAddPost from './ModalAddPost/ModalAddPost'
import AllUsers from './AllUsers/AllUsers'
import './Main.scss'
import UsersOnline from "./UsersOnline/UsersOnline";

const Main = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const {user } = useSelector((state) => state.auth);


const handleChange = (e) => {
setText(e.target.value);
if (e.key === "Enter") {
  navigate('/search/titlePost/'+ text)

}
};
  return (<div className='main'>
    
<UsersOnline/>
    <div className="buttonspost">
    <input onKeyUp={handleChange} placeholder="buscar post..." name="text" />
    <ModalAddPost/>
    </div>
     <div className="contentMain"> 
     <div className="empty">
      
    </div>
    <Posts/>
    <div className="right">
    <Profile/>
    {user.user.role!=="admin" ? <AllUsers/> : null}
    </div>
    </div> 
   
    
    </div>
  )
}

export default Main