import { useDispatch, useSelector } from "react-redux";
import './Post.scss'

const Post = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const {Number_of_posts:numberPosts,posts:postsEl}=posts
  console.log(postsEl)
  const post= postsEl?.map(el=>{return(
    <div className="postContent" key={el._id}>
      <div className="headerPost">
      {el.userId.image ? <img className='imgUser'src={"http://localhost:8080/images/users/" + el.userId.image} alt=''/> : <img className='imgUser' src="http://localhost:8080/images/users/6.png" alt=''/>}
      <span> {el.userId.username}</span>
      </div>
      {el.image ? <img className='imgPost' src={"http://localhost:8080/images/posts/" + el.image} alt=''/> : <img className='imgPost' src="http://localhost:8080/images/posts/1.jpg" alt=''/>}
      <div className="icons">
       <span>Número de likes:{el.likes.length} </span> 
      </div>
      <div className="contentText">
       <span>Título:{el.title}</span> 
       <span>Body:{el.body}</span>
      </div>
    </div>
  )})
  return(
   post
  )
};

export default Post;