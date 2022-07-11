import { useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate,Link,useParams } from "react-router-dom";
import { getPostByName,reset } from "../../../features/posts/postsSlice"
import PostSearch from "../Posts/PostSearch/PostSearch"
import { notification } from 'antd'
import NotFoundPost from "./NotFoundPost/NotFoundPost";


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
navigate('/search/notfound')
}

return(
    <>
    <PostSearch/>
    </>
)
};
export default SearchPost;