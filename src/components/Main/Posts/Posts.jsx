import { useEffect } from 'react';
import Post from './Post/Post'
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../../../features/posts/postsSlice";
import {  resetC } from "../../../features/comments/commentsSlice";


const Posts = () => {
 const dispatch = useDispatch();
 const { comment } = useSelector((state) => state.comments);
  const getPostsAndReset = async () => {

    await dispatch(getAll()); 
    dispatch(reset())
   };

   useEffect(() => {
     getPostsAndReset();
   }, [getAll, comment]);

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
 

  return (
    <div>
        <h1>Posts</h1>
        <Post/>
    </div>
  )
}

export default Posts