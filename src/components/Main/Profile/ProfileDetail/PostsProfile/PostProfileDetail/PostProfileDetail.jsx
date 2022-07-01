import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostById } from "../../../../../../features/posts/postsSlice";


const PostProfileDetail = () => {
    const { _id } = useParams();
    const dispatch = useDispatch();
    const { post } = useSelector((state) => state.posts);
    useEffect(() => {
      dispatch(getPostById(_id));
    }, []);
    console.log(post)
    return (
      <>
    {post.image ? <img key={post._id} className='postsProfile' src={"http://localhost:8080/images/posts/" + post.image} alt=''/> : null}

        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </>
    );
};


export default PostProfileDetail;