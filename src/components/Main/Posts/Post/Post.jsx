import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { like,dislike } from "../../../../features/posts/postsSlice";
import { likeComment,dislikeComment,deleteComment } from "../../../../features/comments/commentsSlice";
import { getAll,reset } from "../../../../features/posts/postsSlice";
import ModalAddComment from "../ModalAddComment/ModalAddComment";
import ModalEditComment from "../ModalEditComment/ModalEditComment";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import {message, Popconfirm, Pagination } from 'antd';
import './Post.scss'


const URL = process.env.REACT_APP_URL



const Post = ({pageC, functionPage}) => {
  
  const { posts,numberPosts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const userLocal = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();


 

  const onChange = (page) => {  
    functionPage(page);
    
    dispatch(getAll(page))
  };
  
  const { isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
   
    if(isLoading){
     <h1>Cargando...</h1>
    }
    dispatch(reset());
  }, [isLoading]);

  const confirm = () => {
    message.info('Clicked on Yes.');
  };

  const post= posts?.map(el=>{
    const comments=el.commentsId?.map((comment,i)=>{
      const isAlreadyLikedComment = comment.likes?.includes(user?.user._id);
      return(
      <div className="comments" key={i}>
          <div className="icons">
      {isAlreadyLikedComment ? (
<HeartFilled  style={{
        color: '#6F0B8A',
      }} onClick={ isAlreadyLikedComment ? () => dispatch(dislikeComment(comment._id)) : () => dispatch(likeComment(comment._id)) } />
) : (
<HeartOutlined style={{
        color: '#6F0B8A',
      }}  onClick={ isAlreadyLikedComment ? () => dispatch(dislikeComment(comment._id)) : () => dispatch(likeComment(comment._id)) } />
)}

       <span>{comment.likes.length} Likes comentario</span> 
      </div>
        <div className="userC">
      {comment.userId.image ? <img className='imgUserC'src={URL+"/images/users/" + comment.userId.image} alt=''/> : null}
 <span>{comment.userId.username}</span>
 <span>{comment.createdAt}</span>
 { comment.userId._id===userLocal.user._id ? <> <ModalEditComment commentId={comment._id}/>  <Popconfirm
        placement="rightTop"
        title="Seguro que quieres borrar este comentario?"
        onConfirm={() => dispatch(deleteComment(comment._id))}
        okText="Yes"
        cancelText="No"
      >
        <button>X</button>
      </Popconfirm> </>: null}



 </div>
 <div className="textC">
       <span className='bold'>{comment.title}&nbsp;</span>  
       <span className='italic'>{comment.body}</span> <br />
       {comment.image ? <img className='gifComment'src={URL+"/images/comments/" + comment.image} alt=''/> : null}
       </div>
      </div>
    )})
    
    const isAlreadyLiked = el.likes?.includes(user?.user._id);





    
    return(
    <div className="postContent" key={el._id}>
      <div className="headerPost">
      {el.userId.image ? <img className='imgUser'src={URL+"/images/users/" + el.userId.image} alt=''/> : <img className='imgUser' src={URL+"/images/users/none.jpg"} alt=''/>}
      <span> {el.userId.username}</span>
      <span>{el.createdAt}</span>
      </div>
      {el.image ? <img className='imgPost' src={URL+"/images/posts/" + el.image} alt=''/> : <img className='imgPost' src={URL+"/images/posts/16.jpg"} alt=''/>}
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
     {comments}

      <ModalAddComment postId={el._id}/>
    </div>
  )})
  return(<>
    <Pagination
      total={numberPosts}
      current={pageC}
      onChange={onChange}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      defaultPageSize={10}
      defaultCurrent={1}
    />
  
   {post}
   <Pagination
   current={pageC}
      total={numberPosts}
      onChange={onChange}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      defaultPageSize={10}
      defaultCurrent={1}
    />
   </>
  )
};

export default Post;