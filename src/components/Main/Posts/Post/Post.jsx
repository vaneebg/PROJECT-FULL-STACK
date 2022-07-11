import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { like,dislike } from "../../../../features/posts/postsSlice";
import { likeComment,dislikeComment,deleteComment } from "../../../../features/comments/commentsSlice";
import { getAll,reset } from "../../../../features/posts/postsSlice";
import ModalAddComment from "../ModalAddComment/ModalAddComment";
import ModalEditComment from "../ModalEditComment/ModalEditComment";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import {message, Popconfirm, Pagination , notification} from 'antd';
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

 

  const post= posts?.map(el=>{

    const newDateMonthP=new Date(el.createdAt).toLocaleDateString()
    const newDateMinuteP=new Date(el.createdAt).toLocaleTimeString()
    const dateP=` ${newDateMinuteP} ${newDateMonthP} `
    const comments=el.commentsId?.map((comment,i)=>{

      const newDateMonthC=new Date(comment.createdAt).toLocaleDateString()
      const newDateMinuteC=new Date(comment.createdAt).toLocaleTimeString()
      const dateC=` ${newDateMinuteC} ${newDateMonthC} `

      const isAlreadyLikedComment = comment.likes?.includes(user?.user._id);
      return(
      <div className="comments" key={i}>
          <div className="iconsPosts">
      {isAlreadyLikedComment ? (
        <i className="fa-solid fa-heart fa-beat" onClick={ isAlreadyLikedComment ? () => dispatch(dislikeComment(comment._id)) : () => dispatch(likeComment(comment._id)) }></i>
) : (
<HeartOutlined style={{
        color: '#6F0B8A',
      }}  onClick={ isAlreadyLikedComment ? () => dispatch(dislikeComment(comment._id)) : () => dispatch(likeComment(comment._id)) } />
)}

       <span className='textlike'> &nbsp;{comment.likes.length} Likes comentario</span> 
      </div>
        <div className="userC">
      {comment.userId.image ? <img className='imgUserC'src={URL+"/images/users/" + comment.userId.image} alt=''/> : null}
 <span className='nameUser'>{comment.userId.username}</span>

 <span className='italic date'>{dateC}</span>
 { comment.userId._id===userLocal.user._id ? <> <ModalEditComment commentId={comment._id}/>  <Popconfirm
        placement="rightTop"
        title="Seguro que quieres borrar este comentario?"
        onConfirm={() => dispatch(deleteComment(comment._id))}
        okText="Yes"
        cancelText="No"
      >
        <button className="btnModalC"><i class="fa-solid big fa-bomb"></i></button>
      </Popconfirm> </>: null}



 </div>
 <div className="textC">
       <span className='bold textC'>{comment.title}&nbsp;</span> <br /> 
       <span className='italic textC'>{comment.body}</span> <br />
       {comment.image ? <img className='gifComment'src={URL+"/images/comments/" + comment.image} alt=''/> : null}
       </div>
      </div>
    )})
    
    const isAlreadyLiked = el.likes?.includes(user?.user._id);





    
    return(
    <div className="postContent animate__animated animate__fadeInUp animate__delay-1s" key={el._id}>
      <div className="headerPost">
      {el.userId.image ? <img className='imgUser'src={URL+"/images/users/" + el.userId.image} alt=''/> : <img className='imgUser' src={URL+"/images/users/none.jpg"} alt=''/>}
      <span className='nameUser'> {el.userId.username}</span>
      
      </div>
      {el.image ? <img className='imgPost' src={URL+"/images/posts/" + el.image} alt=''/> : <img className='imgPost' src={URL+"/images/posts/16.jpg"} alt=''/>}
        <span className='italic date'>{dateP}</span>
      <div className="iconsPosts">

                  {isAlreadyLiked ? (
                    <i className="fa-solid fa-heart fa-beat" onClick={ isAlreadyLiked ? () => dispatch(dislike(el._id)) : () => dispatch(like(el._id)) }></i>
                    
                    ) : (
                      <HeartOutlined onClick={ isAlreadyLiked ? () => dispatch(dislike(el._id)) : () => dispatch(like(el._id)) } />
                      )}

       <span className='textlike'>&nbsp;{el.likes.length} Likes</span> 
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