import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getPostByName,reset } from "../../../features/posts/postsSlice"
import Post from "../Posts/Post/Post"
import { notification } from 'antd'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";


const SearchPost = () => {

const { postName } = useParams();
const { comment } = useSelector((state) => state.comments);

const dispatch = useDispatch()
const navigate = useNavigate()


useEffect(() => {
dispatch(getPostByName(postName))
}, [postName,comment]);


const { isError, isSuccess, message } = useSelector((state) => state.posts);

useEffect(() => {
  if (isError) {
    notification.error({ message: "Error", description: message });
    navigate("/main")
  }
  if (isSuccess) {
    notification.success({ message: "Éxito", description:'Estos son resultados de tu búsqueda:'});
    
    
  }
  dispatch(reset());
}, [isError, isSuccess, message]);

return(
    <>
    <Post/>
    </>
)
};
export default SearchPost;