import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import Followers from '../../../Profile/ProfileDetail/Followers/Followers';
import Following from '../../../Profile/ProfileDetail/Following/Following';
import { getUserById } from '../../../../../features/auth/authSlice';
import PostsProfileUser from "./PostsProfileUser/PostsProfileUser";
import { Tooltip, Tabs} from 'antd';

const { TabPane } = Tabs;
const URL = process.env.REACT_APP_URL



const UserDetail = () => {
    const {userProfile,isLoading}=useSelector((state) => state.auth);
    const { _id } = useParams();
    
    const dispatch = useDispatch();
    
    
    
    useEffect(() => {
      console.log("patata")
      dispatch(getUserById(_id));    
    }, []);

    
    if (isLoading) {
        return <h1>Cargando posts..</h1>;
      }
  
  return (
    <div className='profileDetail'>
        <div className="headerProfile">
        {userProfile?.user.image ? <img className='imgUserC' src={URL+"/images/users/" + userProfile?.user?.image} alt=''/> : <img className='imgUser' src={URL+"/images/users/none.jpg"} alt=''/>}

        <span className='bold'>{userProfile?.user.username}</span>
        <span>Número de posts {userProfile?.Number_of_posts}</span> <br />
        <Tooltip title={<Followers/>}color='purple' key='purple'> 
        <span>Número de followers {userProfile?.Followers}</span> <br /> 
        </Tooltip>
        <Tooltip title={<Following/>}color='blue' key='blue'> 
        <span>Número de following {userProfile?.Following}</span> <br />
        </Tooltip>


        </div>
      
        <Tabs defaultActiveKey="1" centered >
    <TabPane tab="Posts" key="1">
    <PostsProfileUser/>
    </TabPane>
   
   
  </Tabs>
     
   
           
    </div>
  )
}

export default UserDetail