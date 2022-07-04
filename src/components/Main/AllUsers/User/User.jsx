import { HeartOutlined, HeartFilled } from "@ant-design/icons";

import {  useSelector, useDispatch } from "react-redux";
import { follow,unfollow } from "../../../../features/auth/authSlice";

const URL = process.env.REACT_APP_URL

const User = () => {
    const { users } = useSelector((state) => state.auth);
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();


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
    
    </div>
    )}})
  return (<>
   {user}
   </>
  )
}

export default User