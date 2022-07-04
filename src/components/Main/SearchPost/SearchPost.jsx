import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostByName,reset } from "../../../features/posts/postsSlice"
import Post from "../Posts/Post/Post"
import { notification } from 'antd'
import { useDispatch,useSelector } from 'react-redux'


const Search = () => {

const { postName } = useParams();
const dispatch = useDispatch()

useEffect(() => {
dispatch(getPostByName(postName))
}, [postName]);


const { isError, isSuccess, message } = useSelector((state) => state.posts);

useEffect(() => {
  if (isError) {
    notification.error({ message: "Error", description: message });
  }
  if (isSuccess) {
    notification.success({ message: "Éxito", description: message });
    
  }
  dispatch(reset());
}, [isError, isSuccess, message]);

return(
    <>
    <Post/>
    </>
)
};
export default Search;