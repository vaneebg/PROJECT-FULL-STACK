import React from 'react'
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { Link } from 'react-router-dom'
import { PoweroffOutlined } from "@ant-design/icons";

import {  notification } from 'antd'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const onLogout = (e) => {
      e.preventDefault();
      dispatch(logout());
      setTimeout(() => {
        navigate("/");
      }, 2000);
      return notification.success({
        message: "Hasta pronto!",
        description: "byee",
      });
      };

  return (
    <div className='profile'>
      <span>Perfil</span>
    <Link to="/" onClick={onLogout}><PoweroffOutlined /></Link>
           
    </div>
  )
}


export default Profile