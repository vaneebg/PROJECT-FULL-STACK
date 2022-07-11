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
    
<UsersOnline/> <br />
<hr className="hrMain" />
    <div className="buttonspost">
     
      <div className="searchInput">
      <label className="titleSearch" htmlFor="text">Búsqueda posts  </label>
    <input className="searchPost" onKeyUp={handleChange} placeholder="titulo post..." name="text" />
    </div>
    </div>
     <div className="contentMain"> 
     <div className="sticky">
      <div className="right">
    <ModalAddPost/> <br />
      <span className="WhoFollowName">Perfil de usuario:</span>
     <Profile/>
     </div>
    </div>
    <Posts/>
    <div className="sticky">
    <div className="right">
   
    {user.user.role!=="admin" ? <AllUsers/> : null}
    </div>
    </div>
    </div> 
   
    
    </div>
  )
}

export default Main