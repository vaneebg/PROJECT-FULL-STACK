import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Post from './Post/Post'
import { getAll, reset } from "../../../features/posts/postsSlice";
import {  resetC } from "../../../features/comments/commentsSlice";
import { notification } from "antd";


const Posts = () => {
 const dispatch = useDispatch();
 const { comment } = useSelector((state) => state.comments);

 const [current, setCurrent] = useState(1);

  const getPostsAndReset = async () => {

    await dispatch(getAll(current)); 
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
        <Post pageC={current} functionPage={setCurrent}/>
    </div>
  )
}

export default Posts