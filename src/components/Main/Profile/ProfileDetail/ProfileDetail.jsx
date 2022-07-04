import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import { logout,reset } from "../../../../features/auth/authSlice";
import { Link } from 'react-router-dom'
import { PoweroffOutlined } from "@ant-design/icons";

import {  notification } from 'antd'
import { useNavigate } from 'react-router-dom'

import { myInfo } from '../../../../features/auth/authSlice';

import PostsProfile from './PostsProfile/PostsProfile'

const ProfileDetail = () => {
  const { user,isSuccessLogout, message } = useSelector((state) => state.auth);

  const navigate = useNavigate()
  
  const dispatch = useDispatch();
  
    const onLogout = () => {
      console.log('1')

       dispatch(logout()); 
    }
  
    const getInfo = async () => {
      await dispatch(myInfo()); 
    };

    
    useEffect(() => {
      getInfo();
    }, []);
    
  return (
    <div className='profileDetail'>
        <div className="headerProfile">
        <Link to="/" onClick={onLogout}><PoweroffOutlined /></Link>
        {user.user.image ? <img className='imgUser'src={"http://localhost:8080/images/users/" + user.user.image} alt=''/> : <img className='imgUser' src="http://localhost:8080/images/users/none.jpg" alt=''/>}

        <span className='bold'>{user.user.username}</span>
        <span>Número de posts {user.Number_of_posts}</span>
        <span>Número de followers {user.Followers}</span>
        <span>Número de following {user.Following}</span>

        </div>
   
        <PostsProfile/>
  
     
   
           
    </div>
  )
}


export default ProfileDetail