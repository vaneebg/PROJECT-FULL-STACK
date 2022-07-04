import { Link } from 'react-router-dom'
import { Tooltip } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { like,dislike } from "../../../../../features/posts/postsSlice";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";


const URL = process.env.REACT_APP_URL


const FavPosts = () => {
    const { user, isLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    if (isLoading) {
      return <h1>Cargando posts..</h1>;
    }

const postFav=user.user.favList?.map((post,i)=>{
  console.log(post)
  const isAlreadyLiked = post.likes?.includes(user?.user._id);

  return(
    <div key={i}  className="postContentProfile">
    <Tooltip title={"Click para más info sobre: "+post.title}color='purple' key='purple'>
<Link to={"/post/" + post._id}>

   {post.image ? <img className='postsProfile' src={URL+"/images/posts/" + post.image} alt=''/> : null}
      </Link>  
      </Tooltip>
      <div className="icons">
      {isAlreadyLiked ? (
<HeartFilled onClick={ isAlreadyLiked ? () => dispatch(dislike(post._id)) : () => dispatch(like(post._id)) } />
) : (
<HeartOutlined onClick={ isAlreadyLiked ? () => dispatch(dislike(post._id)) : () => dispatch(like(post._id)) } />
)}

       <span>{post.likes.length} Likes</span> 
      </div>
   </div>
)}
  )
  return(
    <div className='postsUser'>
    {postFav}
    
    </div>
  )
}

export default FavPosts