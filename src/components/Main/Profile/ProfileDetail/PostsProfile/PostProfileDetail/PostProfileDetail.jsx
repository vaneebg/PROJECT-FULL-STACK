import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostById } from "../../../../../../features/posts/postsSlice";
import './PostProfileDetail.scss'

const PostProfileDetail = () => {
    const { _id } = useParams();
    const dispatch = useDispatch();
    const { post } = useSelector((state) => state.posts);
    useEffect(() => {
      dispatch(getPostById(_id));
    }, []);
    console.log(post)
    return (
      <div className='postProfileDetail'>
    {post.image ? <img key={post._id} className='imageProfileDetail' src={"http://localhost:8080/images/posts/" + post.image} alt=''/> : null}
<span>Número de likes: {post.likes?.length}</span>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    );
};


export default PostProfileDetail;