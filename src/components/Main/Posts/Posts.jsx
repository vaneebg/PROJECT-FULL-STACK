import { useEffect } from 'react';
import Post from './Post/Post'
import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../../../features/posts/postsSlice";

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

 

  return (
    <div>
        <h1>Posts</h1>
        <Post/>
    </div>
  )
}

export default Posts