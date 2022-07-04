import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import { logout } from "../../../../features/auth/authSlice";
import { Link } from 'react-router-dom'
import { PoweroffOutlined } from "@ant-design/icons";

import { useNavigate } from 'react-router-dom'
import { myInfo } from '../../../../features/auth/authSlice';

import PostsProfile from './PostsProfile/PostsProfile'
import ModalEditUser from './ModalEditUser/ModalEditUser';
import { Tooltip } from 'antd';
import Followers from './Followers/Followers';
import Following from './Following/Following';

const URL = process.env.REACT_APP_URL


const ProfileDetail = () => {
  const { user} = useSelector((state) => state.auth);

  const navigate = useNavigate()
  
  const dispatch = useDispatch();
  
    const onLogout = () => {

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
        {user.user.image ? <img className='imgUser'src={URL+"/images/users/" + user.user?.image} alt=''/> : <img className='imgUser' src={URL+"/images/users/none.jpg"} alt=''/>}

        <span className='bold'>{user.user.username}</span>
        <span>Número de posts {user.Number_of_posts}</span> <br />
        <Tooltip title={<Followers/>}color='purple' key='purple'> 
        <span>Número de followers {user.Followers}</span> <br /> 
        </Tooltip>
        <Tooltip title={<Following/>}color='blue' key='blue'> 

        <span>Número de following {user.Following}</span> <br />
        </Tooltip>


        </div>
   <ModalEditUser/>
        <PostsProfile/>
  
     
   
           
    </div>
  )
}


export default ProfileDetail