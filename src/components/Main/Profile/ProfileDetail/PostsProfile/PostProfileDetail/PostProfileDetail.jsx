import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostById,deletePost,reset } from "../../../../../../features/posts/postsSlice";
import './PostProfileDetail.scss'
import { notification } from 'antd'
import ModalEditPost from './ModalEditPost/ModalEditPost'
import { useNavigate } from "react-router-dom";


const URL = process.env.REACT_APP_URL



const PostProfileDetail = () => {
    const { _id } = useParams();
    const dispatch = useDispatch();
    const { post } = useSelector((state) => state.posts);
    const navigate = useNavigate()
    const userLocal = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
      dispatch(getPostById(_id));
    }, []);

    const { isError, isSuccess, message } = useSelector((state) => state.posts);

    useEffect(() => {
      if (isError) {
        notification.error({ message: "Error", description: message });
      }
      if (isSuccess) {
        notification.success({ message: "Éxito", description: message });
          navigate("/profile");
   
      }
      dispatch(reset());
    }, [isError, isSuccess, message]);

    const comments=post.commentsId?.map((el,i)=>{return(
      <div key={i}className="comments">

        <div className="icons">

       <span>{el.likes.length} Likes comentario</span> 
      </div>
          <div className="userC">
  {el.userId.image ? <img className='imgUserC'src={URL+"/images/users/" + el.userId.image} alt=''/> : null}
  <span>{el.userId.username}</span>
  <span>{el.createdAt}</span>
  </div>
  <div className="textC">
        <span className='bold'>{el.title}&nbsp;</span>  
        <span className='italic'>{el.body}</span> <br />
        {el.image ? <img className='gifComment'src={URL+"/images/comments/" + el.image} alt=''/> : null}
        </div>
        <div className="userComment">
  </div>
      </div>
  )})
    return (
      <div className='postProfileDetail'>
    { post.userId===userLocal.user._id ? <><ModalEditPost/><button onClick={() => dispatch(deletePost(post._id))}>X</button> </>: null}
       

    {post.image ? <img key={post._id} className='imageProfileDetail' src={URL+"/images/posts/" + post.image} alt=''/> : null}
<span>Número de likes: {post.likes?.length}</span>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <span>{post.createdAt}</span>
        {comments}
      </div>
    );
};


export default PostProfileDetail;