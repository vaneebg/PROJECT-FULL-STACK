import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../features/auth/authSlice";
import { Link } from 'react-router-dom'
import { PoweroffOutlined } from "@ant-design/icons";

import {  notification } from 'antd'
import { useNavigate } from 'react-router-dom'

const ProfileDetail = () => {

  const { user } = useSelector((state) => state.auth);
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
      {user.user.username}
    <Link to="/" onClick={onLogout}><PoweroffOutlined /></Link>
           
    </div>
  )
}


export default ProfileDetail