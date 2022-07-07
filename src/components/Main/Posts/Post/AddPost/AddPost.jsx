import {  useState,useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { addNewPost,reset} from "../../../../../features/posts/postsSlice";
import { SmileOutlined } from '@ant-design/icons';
import { notification,Input } from "antd";


const AddPost = () => {
  const initialState = {
    title:"",
    body:"",
    image:""
  };
  const [formData, setFormData] = useState(initialState);
  
  const { title,body,image } = formData;

  const dispatch = useDispatch();
  const { isError, isSuccess, message } = useSelector((state) => state.posts);

  useEffect(() => {
    if (isError) {
      notification.error({ message: "Error", description: message });
    }
    if (isSuccess) {
      notification.success({ message: "Perfecto!", description: message, icon: (
        <SmileOutlined
          style={{
            color: '#108ee9',
          }}
        />
      ), });
    }
    dispatch(reset());
  }, [isError, isSuccess, message]);


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
      setFormData(initialState)
    
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
       type="file" value={image} name='image'/> <br />
      <input type="submit" value='Publicar post'/>
    </form>
    </div>
  );
};

export default AddPost;