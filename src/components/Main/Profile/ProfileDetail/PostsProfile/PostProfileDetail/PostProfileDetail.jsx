import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostById } from "../../../../../../features/posts/postsSlice";
import Comments from "../../../../Posts/Post/Comments/Comments";
import './PostProfileDetail.scss'

const PostProfileDetail = () => {
    const { _id } = useParams();
    const dispatch = useDispatch();
    const { post } = useSelector((state) => state.posts);
    useEffect(() => {
      dispatch(getPostById(_id));
    }, []);
    console.log(post)
    const comments=post.commentsId?.map((el,i)=>{return(
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
  )})
    return (
      <div className='postProfileDetail'>
    {post.image ? <img key={post._id} className='imageProfileDetail' src={"http://localhost:8080/images/posts/" + post.image} alt=''/> : null}
<span>Número de likes: {post.likes?.length}</span>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <span>{post.createdAt}</span>
        {comments}
      </div>
    );
};


export default PostProfileDetail;