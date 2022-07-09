import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import { logout, reset } from "../../../../features/auth/authSlice";
import { Link } from 'react-router-dom'
import { PoweroffOutlined } from "@ant-design/icons";

import { myInfo,deleteUser} from '../../../../features/auth/authSlice';

import PostsProfile from './PostsProfile/PostsProfile'
import ModalEditUser from './ModalEditUser/ModalEditUser';
import Followers from './Followers/Followers';
import Following from './Following/Following';
import FavPosts from './FavPosts/FavPosts';
import { Tooltip,Tabs,notification,Popconfirm} from 'antd';
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;


const URL = process.env.REACT_APP_URL


const ProfileDetail = () => {
  const { user} = useSelector((state) => state.auth);


  const dispatch = useDispatch();
  const navigate = useNavigate()

    const onLogout = () => {

       dispatch(logout()); 
    }
  
  

    useEffect(() => {
      dispatch(myInfo())
        }, []);

const deleteUserAndRedirect =(_id)=>{
  dispatch(deleteUser(_id))
  notification.success({ message: "tu cuenta ha sido borrada" });
  navigate("/");
  dispatch(reset());
}
    
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
        <Popconfirm
        placement="bottom"
        title="Seguro que quieres borrar tu cuenta definitivamente?"
        onConfirm={() => deleteUserAndRedirect((user.user._id))}
        okText="Yes"
        cancelText="No"
      >
        <button>Eliminar cuenta</button>
      </Popconfirm>

        </div>
   <ModalEditUser/>
      {user.user.role!=="admin" ?  <Tabs defaultActiveKey="1" centered >
    <TabPane tab="Posts" key="1">
    <PostsProfile/>
    </TabPane>
    <TabPane tab="Posts con likes" key="2">
      <FavPosts/>
    </TabPane>
   
  </Tabs> : null }
       
     
   
           
    </div>
  )
}


export default ProfileDetail