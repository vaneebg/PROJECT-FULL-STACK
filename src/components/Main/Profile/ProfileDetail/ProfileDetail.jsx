import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import { logout, reset } from "../../../../features/auth/authSlice";
import { myInfo,deleteUser} from '../../../../features/auth/authSlice';
import PostsProfile from './PostsProfile/PostsProfile'
import ModalEditUser from './ModalEditUser/ModalEditUser';
import Followers from './Followers/Followers';
import Following from './Following/Following';
import FavPosts from './FavPosts/FavPosts';
import { Tooltip,Tabs,notification,Popconfirm} from 'antd';
import { PoweroffOutlined } from "@ant-design/icons";
import './ProfileDetail.scss'
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
          <div className="empty">

          </div>
          <div className="block">
          <div className="img">
        {user.user.image ? <img className='imgUserProfileB'src={URL+"/images/users/" + user.user?.image} alt=''/> : <img className='imgUser' src={URL+"/images/users/none.jpg"} alt=''/>}
        </div>
        <div className="contentProfileT">
        <span className='bold profileName'>{user.user.username}</span> <br />
        <span className="textProfileD">Número de posts {user.Number_of_posts}</span> <br />
        {(user.Followers!==0) ?  
        <Tooltip title={<Followers/>}color='purple' key='purple'> 
        <span className="textProfileD">Número de followers {user.Followers}</span> <br /> 
        </Tooltip> 
        : 
        <Tooltip visible={false} title={<Followers/>}color='purple' key='purple'> 
        <span className="textProfileD">Número de followers {user.Followers}</span> <br /> 
        </Tooltip> 
        }
       {(user.Following!==0)? <Tooltip title={<Following/>}color='blue' key='blue'> 
        <span className="textProfileD">Número de following {user.Following}</span> <br />
      
        </Tooltip> :<Tooltip visible={false} title={<Following/>}color='blue' key='blue'> 
        <span className="textProfileD">Número de following {user.Following}</span> <br />
      
        </Tooltip> }
        <div className="buttonsProfile">
          <ModalEditUser/>
        <Popconfirm
        placement="bottom"
        title="Seguro que quieres borrar tu cuenta definitivamente?"
        onConfirm={() => deleteUserAndRedirect((user.user._id))}
        okText="Yes"
        cancelText="No"
      >
       <i class="fa-solid fa-trash-can big"></i>
      </Popconfirm>
   </div>
   </div>
        </div>
<div className="logoutP">
        <Link to="/" onClick={onLogout}><PoweroffOutlined /></Link>

</div>
        </div>
        <br />
      {user.user.role!=="admin" ?  <Tabs defaultActiveKey="1" centered > 
    <TabPane className="black" tab="Posts" key="1">
    <PostsProfile/>
    </TabPane>
    <TabPane className="black" tab="Posts con likes" key="2">
      <FavPosts/>
    </TabPane>
   
  </Tabs> : null }
       
     
   
           
    </div>
  )
}


export default ProfileDetail