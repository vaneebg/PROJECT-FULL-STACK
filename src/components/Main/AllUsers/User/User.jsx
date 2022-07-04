import { HeartOutlined, HeartFilled } from "@ant-design/icons";

import {  useSelector, useDispatch } from "react-redux";
import { follow } from "../../../../features/auth/authSlice";

const URL = process.env.REACT_APP_URL

const User = () => {
    const { users } = useSelector((state) => state.auth);
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();

//         const isAlreadyLiked = el.likes?.includes(user?.user._id);

//      <div className="icons">
      // {isAlreadyLiked ? (
      //   <HeartFilled onClick={ isAlreadyLiked ? () => dispatch(dislike(el._id)) : () => dispatch(like(el._id)) } />
      //   ) : (
      //   <HeartOutlined onClick={ isAlreadyLiked ? () => dispatch(dislike(el._id)) : () => dispatch(like(el._id)) } />
      //   )}
        
      //          <span>{el.likes.length} Likes</span> 
      //         </div>

const user=users.map((el,i)=>{
  const isAlreadyFollowing=el.followers?.includes(userLocal.user._id)
  return(<div className='connects' key={i}>
         {el.image ? <img className='imgUserC'src={URL+"/images/users/" + el.image} alt=''/> : null}
    {el.username}
    <div className="icons">
      // {isAlreadyFollowing ? (
        <HeartFilled onClick={ isAlreadyFollowing? () => console.log("dejar seguir") : () => dispatch(follow(el._id)) }/>
        ) : (
        <HeartOutlined onClick={ isAlreadyFollowing? () =>  console.log("dejar seguir") : () => dispatch(follow(el._id)) }/>
        )}
        
              </div>
    
    </div>
    )})
  return (<>
   {user}
   </>
  )
}

export default User