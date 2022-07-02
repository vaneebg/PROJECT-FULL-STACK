import { notification } from "antd";
import {  useState,useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { reset} from "../../../../../features/posts/postsSlice";
import { addNewPost} from "../../../../../features/posts/postsSlice";
import { Input } from 'antd';


const AddPost = () => {
  const initialState = {
    title:"",
    body:"",
    image:""
  };
  const [formData, setFormData] = useState(initialState);
  const { title,body,image } = formData;

  const dispatch = useDispatch();

   const { isError, isSuccess, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    if (isError) {
      notification.error({ message: "Error" });
    }
    if (isSuccess) {
      notification.success({ message: "Éxito" });
    }
    if (isLoading) {
      return <h1>Cargando posts..</h1>;
    }
    dispatch(reset());
  }, [isError, isSuccess, isLoading]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault(); 
        const formData = new FormData();
        if (e.target.image.files[0]) formData.set('image', e.target.image.files[0]);
        formData.set('title', e.target.title.value)
        formData.set('body', e.target.body.value)
      dispatch(addNewPost(formData));
    
  }; 
  return (
    <div className="centerAddPost">
    <form className='formPost' onSubmit={onSubmit}>
        <label htmlFor="title">Título del post:</label> 
      <Input type="text" name="title" value={title} onChange={onChange} required/> 
      <label htmlFor="body">Cuerpo del post:</label> 
      <Input  type="text" name="body" value={body} onChange={onChange} required/> 
      <input 
       onChange={onChange}
       type="file" value={image} name='image'/>
      <input type="submit" />
    </form>
    </div>
  );
};

export default AddPost;