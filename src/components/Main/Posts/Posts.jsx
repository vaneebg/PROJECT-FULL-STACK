import { useEffect } from 'react';
import Post from './Post/Post'
import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../../../features/posts/postsSlice";


const Posts = () => {
 const dispatch = useDispatch();
 const { isLoading } = useSelector((state) => state.posts);


  const getPostsAndReset = async () => {

    await dispatch(getAll()); 
    dispatch(reset())
   };

   useEffect(() => {
     getPostsAndReset();
   }, []);

   if (isLoading) {
    return <h1>Cargando posts..</h1>;
  }

  return (
    <div>
        <h1>Posts</h1>
        <Post/>
    </div>
  )
}

export default Posts