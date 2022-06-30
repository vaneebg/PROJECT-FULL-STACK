import React from 'react'
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";


const Profile = () => {
    const dispatch = useDispatch();

    const onLogout = (e) => {
      e.preventDefault();
      dispatch(logout());

  return (<>
    <div>Profile</div>
    <Link to="/login" onClick={onLogout}><PoweroffOutlined /></Link>
           
          
          </>
  )
}
}

export default Profile