import { useDispatch, useSelector } from "react-redux";
import { like,dislike } from "../../../../features/posts/postsSlice";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import './Post.scss'

const Post = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const {Number_of_posts:numberPosts,posts:postsEl}=posts


  const post= postsEl?.map(el=>{
    const isAlreadyLiked = el.likes?.includes(user?.user._id);

    return(
    <div className="postContent" key={el._id}>
      <div className="headerPost">
      {el.userId.image ? <img className='imgUser'src={"http://localhost:8080/images/users/" + el.userId.image} alt=''/> : <img className='imgUser' src="http://localhost:8080/images/users/none.jpg" alt=''/>}
      <span> {el.userId.username}</span>
      </div>
      {el.image ? <img className='imgPost' src={"http://localhost:8080/images/posts/" + el.image} alt=''/> : <img className='imgPost' src="http://localhost:8080/images/posts/1.jpg" alt=''/>}
      <div className="icons">
      {isAlreadyLiked ? (
<HeartFilled onClick={ isAlreadyLiked ? () => dispatch(dislike(el._id)) : () => dispatch(like(el._id)) } />
) : (
<HeartOutlined onClick={ isAlreadyLiked ? () => dispatch(dislike(el._id)) : () => dispatch(like(el._id)) } />
)}

       <span>{el.likes.length} Likes</span> 
      </div>
      <div className="contentText">
       <span className='bold'>{el.title} &nbsp;</span> 
       <span className='italic'>{el.body}</span>
      </div>
    </div>
  )})
  return(
   post
  )
};

export default Post;