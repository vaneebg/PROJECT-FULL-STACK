import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { myInfo } from '../../../features/auth/authSlice';
import './Profile.scss'

const URL = process.env.REACT_APP_URL


const Profile = () => {

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(myInfo()); 
  }, []);
  return (
    <div className='profileIcon'>
      <div className="nameAndI">
      {user.user.image ? <img className='imgUser'src={URL+"/images/users/" + user.user.image} alt=''/> : <img className='imgUser' src={URL+"/images/users/none.jpg"} alt=''/>}
     
      <Link to="/profile"> <span className="usernameProfile WhoFollowName"> {user.user.username}</span></Link>
      </div>
           <span>Email: {user.user.email}</span>
           <span>Edad: {user.user.age}</span>
    </div>
  )
}


export default Profile