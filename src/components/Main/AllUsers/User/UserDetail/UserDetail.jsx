import React from 'react'
import Followers from '../../../Profile/ProfileDetail/Followers/Followers';
import Following from '../../../Profile/ProfileDetail/Following/Following';
import PostsProfile from '../../../Profile/ProfileDetail/PostsProfile/PostsProfile';
import { Tooltip, Tabs} from 'antd';
import { getUserById } from '../../../../../features/auth/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";

const { TabPane } = Tabs;


const UserDetail = () => {
    const {user,isLoading}=useSelector((state) => state.auth);
    console.log(user)
    const { _id } = useParams();
    
    const dispatch = useDispatch();
    
    
    const getInfoUser = async () => {
        await dispatch(getUserById(_id)); 
    };
    
    useEffect(() => {
        getInfoUser();
    }, []);
    
    
    if (isLoading) {
        return <h1>Cargando posts..</h1>;
      }
console.log(user.user.image)
  return (
    <div className='profileDetail'>
        <div className="headerProfile">
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
      
        <Tabs defaultActiveKey="1" centered >
    <TabPane tab="Posts" key="1">
    <PostsProfile/>
    </TabPane>
   
   
  </Tabs>
     
   
           
    </div>
  )
}

export default UserDetail