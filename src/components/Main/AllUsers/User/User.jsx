
import {  useSelector } from "react-redux";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const URL = process.env.REACT_APP_URL

const User = () => {
    const { users } = useSelector((state) => state.auth);
    const userLocal = JSON.parse(localStorage.getItem("user"));

//         const isAlreadyLiked = el.likes?.includes(user?.user._id);

//      <div className="icons">
      // {isAlreadyLiked ? (
      //   <HeartFilled onClick={ isAlreadyLiked ? () => dispatch(dislike(el._id)) : () => dispatch(like(el._id)) } />
      //   ) : (
      //   <HeartOutlined onClick={ isAlreadyLiked ? () => dispatch(dislike(el._id)) : () => dispatch(like(el._id)) } />
      //   )}
        
      //          <span>{el.likes.length} Likes</span> 
      //         </div>

const user=users.map(el=>{
  const isAlreadyFollowing=el.followers?.includes(userLocal.user._id)
  return(<div className='connects' key={el._id}>
         {el.image ? <img className='imgUserC'src={URL+"/images/users/" + el.image} alt=''/> : null}
    {el.username}
    <div className="icons">
      // {isAlreadyFollowing ? (
        <button onClick={ isAlreadyFollowing? () => console.log("dejar seguir") : () => console.log("seguir") }>Unfollow</button>
        ) : (
        <button onClick={ isAlreadyFollowing? () =>  console.log("dejar seguir") : () => console.log("seguir") } >Follow</button>
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