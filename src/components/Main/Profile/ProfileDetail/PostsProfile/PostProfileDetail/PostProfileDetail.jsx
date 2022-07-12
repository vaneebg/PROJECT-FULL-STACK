import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getPostById, deletePost, reset, resetPost, like, dislike } from "../../../../../../features/posts/postsSlice";
import ModalEditPost from './ModalEditPost/ModalEditPost'
import { Popconfirm, notification } from 'antd';
import './PostProfileDetail.scss'
import { likeComment,dislikeComment,deleteComment, resetC } from "../../../../../../features/comments/commentsSlice";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import ModalAddComment from "../../../../Posts/ModalAddComment/ModalAddComment";
import ModalEditComment from "../../../../Posts/ModalEditComment/ModalEditComment";


const URL = process.env.REACT_APP_URL



const PostProfileDetail = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);
  const { comment } = useSelector((state) => state.comments);

  const userLocal = JSON.parse(localStorage.getItem("user"));

  const getPostAndReset = async () => {

    await dispatch(getPostById(_id)); 
   };

  useEffect(() => {
    dispatch(getPostById(_id));

    return () => {
      dispatch(resetPost())
    }
  }, [])

  useEffect(() => {
getPostAndReset()
  }, [comment]);

  const deletePostAndNav =(_id)=>{
    dispatch(deletePost(_id))
    navigate("/profile");
  }

  const { isError, isSuccess, message } = useSelector((state) => state.comments);

  useEffect(() => {
    if (isError) {
      notification.error({ message: "Error", description: message });
    }
    if (isSuccess) {
      notification.success({ message: "Éxito", description: message });
 
    }
   
    dispatch(resetC());
  }, [isError, isSuccess, message]);

  

  const comments = post.commentsId?.map((el, i) => {
    const newDateMonthC = new Date(el.createdAt).toLocaleDateString()
    const newDateMinuteC = new Date(el.createdAt).toLocaleTimeString()
    const dateC = ` ${newDateMinuteC} ${newDateMonthC} `

    const isAlreadyLikedComment = el.likes?.includes(user?.user._id);


    return (
      <div key={i} className="comments">

        <div className="iconsPosts">
        {isAlreadyLikedComment ? (
        <i className="fa-solid fa-heart fa-beat" onClick={ isAlreadyLikedComment ? () => dispatch(dislikeComment(el._id)) : () => dispatch(likeComment(el._id)) }></i>
) : (
<HeartOutlined style={{
        color: '#6F0B8A',
      }}  onClick={ isAlreadyLikedComment ? () => dispatch(dislikeComment(el._id)) : () => dispatch(likeComment(el._id)) } />
)}
          <span className='textlike'>&nbsp;{el.likes.length} Likes comentario</span>
        </div>
        <div className="userC">
          {el.userId.image ? <img className='imgUserC' src={URL + "/images/users/" + el.userId.image} alt='' /> : null}
          <span className='nameUser'>{el.userId.username}</span>
          <span className='italic date'>{dateC}</span>
          { el.userId._id===userLocal.user._id ? <> <ModalEditComment commentId={el._id}/>  <Popconfirm
        placement="rightTop"
        title="Seguro que quieres borrar este comentario?"
        onConfirm={() => dispatch(deleteComment(el._id))}
        okText="Yes"
        cancelText="No"
      >
        <button className="btnModalC"><i class="fa-solid big fa-bomb"></i></button>
      </Popconfirm> </>: null}

        </div>
        <div className="textC">
          <span className='bold textC'>{el.title}&nbsp;</span>
          <span className='italic textC'>{el.body}</span> <br />
          {el.image ? <img className='gifComment' src={URL + "/images/comments/" + el.image} alt='' /> : null}
        </div>
        <div className="userComment">
        </div>
      </div>
    )
  })

  const newDateMonthP = new Date(post.createdAt).toLocaleDateString()
  const newDateMinuteP = new Date(post.createdAt).toLocaleTimeString()
  const dateP = ` ${newDateMinuteP} ${newDateMonthP} `
  const isAlreadyLiked = post.likes?.includes(user?.user._id);

  {console.log(post)}
  return (
    <div className="centerPost">
    <div className='postProfileDetail'>

      <div className="contentText display">
      <span className='bold size'>{post.title} &nbsp;</span>
       <span className='italic'>{post.body}</span>
       </div>

      {post.image ? <img key={post._id} className='imageProfileDetail' src={URL + "/images/posts/" + post.image} alt='' /> : null}
     <div className="btnModify">
      {post.userId === userLocal.user._id ? <><ModalEditPost /><Popconfirm
        placement="rightTop"
        title="Seguro que quieres borrar este post?"
        onConfirm={() => dispatch(deletePostAndNav(post._id))}
        okText="Yes"
        cancelText="No"
      >
         <i className="fa-solid fa-trash-can big"></i>
      </Popconfirm> </> : null}
      </div>
      <div className="iconsPosts">
      {isAlreadyLiked ? (
        <i className="fa-solid fa-heart fa-beat" onClick={ isAlreadyLiked ? () => dispatch(dislike(post._id)) : () => dispatch(like(post._id)) } ></i>
) : (
<HeartOutlined onClick={ isAlreadyLiked ? () => dispatch(dislike(post._id)) : () => dispatch(like(post._id)) } />
)}

       <span className='textlike'>&nbsp;{post.likes?.length} Likes</span> 
      </div>
      <span className='italic date'>{dateP}</span>
      {post.commentsId?.length!==0 ?
      <div className="boxC1">
     {comments}
     </div>
     :
     comments}
      <ModalAddComment postId={post._id}/>
    </div>
    </div>
  );
};


export default PostProfileDetail;