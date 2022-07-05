import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useEffect } from 'react'
import {  notification } from 'antd'
import { Link } from 'react-router-dom'

import {  useSelector, useDispatch } from "react-redux";
import { follow,unfollow,reset } from "../../../../features/auth/authSlice";

const URL = process.env.REACT_APP_URL

const User = () => {
    const { users } = useSelector((state) => state.auth);
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();

    const { isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
     
      if (isError) {
        notification.error({ message: "Error", description: message });
      }
      if (isSuccess) {
        notification.success({ message: "Éxito", description: message });
        
      }
      dispatch(reset());
    }, [isError, isSuccess, message]);



const user=users.map((el,i)=>{
  if(el._id!==userLocal.user._id){
  const isAlreadyFollowing=el.followers?.includes(userLocal.user._id)
  return(<div className='connects' key={i}>
         {el.image ? <img className='imgUserC'src={URL+"/images/users/" + el.image} alt=''/> : null}
    {el.username}
    <div className="icons">
       {isAlreadyFollowing ? (
        <HeartFilled onClick={ isAlreadyFollowing? () => dispatch(unfollow(el._id)) : () => dispatch(follow(el._id)) }/>
        ) : (
        <HeartOutlined onClick={ isAlreadyFollowing? () =>  dispatch(unfollow(el._id)) : () => dispatch(follow(el._id)) }/>
        )}
        
              </div>
              <Link to={"/user/" + el._id}>Ver perfil</Link>
    </div>
    )}})
  return (<>
   {user}
   </>
  )
}

export default User