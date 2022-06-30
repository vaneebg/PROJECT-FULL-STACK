import React from 'react'
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { Link } from 'react-router-dom'
import { PoweroffOutlined } from "@ant-design/icons";



const Profile = () => {
    const dispatch = useDispatch();

    const onLogout = (e) => {
      e.preventDefault();
      dispatch(logout());
      };

  return (
    <div className='profile'>
      <span>Perfil</span>
    <Link to="/" onClick={onLogout}><PoweroffOutlined /></Link>
           
    </div>
  )
}


export default Profile