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
      dispatch(getUserById(_id));    
    }, []);

    
    if (isLoading) {
        return <h1>Cargando posts..</h1>;
      }
  return (
    <div className='profileDetail'>
        <div className="headerProfile">
          <div className="empty">

          </div>
          <div className="block">
          <div className="img">
        {userProfile?.user.image ? <img className='imgUserProfileB' src={URL+"/images/users/" + userProfile?.user?.image} alt=''/> : <img className='imgUser' src={URL+"/images/users/none.jpg"} alt=''/>}
        </div>
        <div className="contentProfileT">
        <span className='bold profileName'>{userProfile?.user.username}</span> <br />
        <span className="textProfileD">Número de posts {userProfile?.Number_of_posts}</span> <br />
{userProfile?.Followers!==0 ? <Tooltip placement="right" title={<Followers/>}color='purple' key='purple'> 
        <span className="textProfileD">Número de followers {userProfile?.Followers}</span> <br /> 
        </Tooltip>: <Tooltip visible={false} title={<Followers/>}color='purple' key='purple'> 
        <span className="textProfileD">Número de followers {userProfile?.Followers}</span> <br /> 
        </Tooltip>}

        {userProfile?.Following!==0 ?   <Tooltip placement="right" title={<Following/>}color='blue' key='blue'> 
        <span className="textProfileD">Número de following {userProfile?.Following}</span> <br />
        </Tooltip> : <Tooltip visible={false} title={<Following/>}color='blue' key='blue'> 
        <span className="textProfileD">Número de following {userProfile?.Following}</span> <br />
        </Tooltip> }
       <div className="empty">

       </div>
      
</div>
        </div>
       <div className="empty"></div>
      </div>
        <Tabs defaultActiveKey="1" centered >
    <TabPane className="black" tab="Posts" key="1">
    <PostsProfileUser/>
    </TabPane>
   
   
  </Tabs>
     
   
           
    </div>
  )
}

export default UserDetail