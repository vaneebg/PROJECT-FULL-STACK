import { useDispatch, useSelector } from "react-redux";

import './Comments.scss'

const Comments = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const {posts:postsEl}=posts

const comments=postsEl?.map(post=>post.commentsId?.map((el,i)=>{return(
    <div key={i}className="comments">
        <div className="userC">
{el.userId.image ? <img className='imgUserC'src={"http://localhost:8080/images/users/" + el.userId.image} alt=''/> : null}
<span>{el.userId.username}</span>
<span>{el.createdAt}</span>
</div>
<div className="textC">
      <span className='bold'>{el.title}&nbsp;</span>  
      <span className='italic'>{el.body}</span> <br />
      {el.image ? <img className='gifComment'src={"http://localhost:8080/images/comments/" + el.image} alt=''/> : null}
      </div>
      <div className="userComment">
</div>
    </div>
)}))
  return(<>
  {comments}
   </>
  )
};

export default Comments;