import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import { logout } from "../../../../features/auth/authSlice";
import { Link } from 'react-router-dom'
import { PoweroffOutlined } from "@ant-design/icons";

import {  notification } from 'antd'
import { useNavigate } from 'react-router-dom'

import { myInfo } from '../../../../features/auth/authSlice';

import PostsProfile from './PostsProfile/PostsProfile'

const ProfileDetail = () => {

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

    const navigate = useNavigate()

 const getInfo = async () => {
    await dispatch(myInfo()); 
   };

   useEffect(() => {
     getInfo();
   }, []);

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
    <div className='profileDetail'>
        <div className="headerProfile">
        <Link to="/" onClick={onLogout}><PoweroffOutlined /></Link>
        {user.user.image ? <img className='imgUser'src={"http://localhost:8080/images/users/" + user.user.image} alt=''/> : <img className='imgUser' src="http://localhost:8080/images/users/none.jpg" alt=''/>}

        <span>Perfil de  {user.user.username}</span>
        <span>Número de posts {user.Number_of_posts}</span>
        <span>Número de followers {user.Followers}</span>
        <span>Número de following {user.Following}</span>

        </div>
   
        <PostsProfile/>
  
     
   
           
    </div>
  )
}


export default ProfileDetail