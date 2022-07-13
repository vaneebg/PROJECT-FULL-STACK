import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from './Profile/Profile'
import Posts from './Posts/Posts'
import ModalAddPost from './ModalAddPost/ModalAddPost'
import AllUsers from './AllUsers/AllUsers'
import UsersOnline from "./UsersOnline/UsersOnline";
import AddPostNoDrag from "./Posts/Post/AddPostNoDrag/AddPostNoDrag";
import './Main.scss'

const Main = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const { user } = useSelector((state) => state.auth);


  const handleChange = (e) => {
    setText(e.target.value);
    if (e.key === "Enter") {
      navigate('/search/titlePost/' + text)
    }
  };
  return (
    <div className='main'>
      <UsersOnline /> <br />
      <hr className="hrMain" />
      <div className="buttonspost">
        <div className="searchInput display">
          <label className="titleSearch" htmlFor="text">Búsqueda posts  </label>
          <div className="searchC">
            <input className="searchPost" onKeyUp={handleChange} placeholder="titulo post..." name="text" />
            <i className="fa-solid fa-magnifying-glass-arrow-right iconS"></i>
          </div>
        </div>
      </div>
      <div className="contentMain">
        <div className="sticky">
          <div className="right">
            <ModalAddPost /> <br />
            <Profile />
          </div>
        </div>
        <Posts />
        <div className="sticky  item-2">
          <div className="right">
            {user.user.role !== "admin" ? <AllUsers /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main