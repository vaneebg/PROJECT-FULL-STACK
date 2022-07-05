import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getPostByName,reset } from "../../../features/posts/postsSlice"
import Post from "../Posts/Post/Post"
import { notification } from 'antd'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'


const SearchPost = () => {

const { postName } = useParams();
const { comment } = useSelector((state) => state.comments);
const { posts} = useSelector((state) => state.posts);


const dispatch = useDispatch()
const navigate = useNavigate()


useEffect(() => {
dispatch(getPostByName(postName))
}, [postName,comment]);


const { isError, message } = useSelector((state) => state.posts);

useEffect(() => {
  
  if (isError) {
    notification.error({ message: "Error", description: message });
  }
  
  dispatch(reset());
}, [isError, message]);


if(posts.length===0){
  return(
    <> <h1>No se ha encontrado ningún post</h1>
  <Link to="/main">Volver a principal</Link>
  </>
  )
}

return(
    <>
    <Post/>
    </>
)
};
export default SearchPost;