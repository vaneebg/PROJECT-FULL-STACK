import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
const URL = process.env.REACT_APP_URL


const Profile = () => {

  const { user } = useSelector((state) => state.auth);
 
  return (
    <div className='profileIcon'>
      {user.user.image ? <img className='imgUser'src={URL+"/images/users/" + user.user.image} alt=''/> : <img className='imgUser' src={URL+"/images/users/none.jpg"} alt=''/>}
     
      <Link to="/profile"> <span> {user.user.username}</span></Link>
           
    </div>
  )
}


export default Profile