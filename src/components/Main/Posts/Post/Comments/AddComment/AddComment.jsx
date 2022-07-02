import {  useState } from "react";
import { useDispatch} from "react-redux";
import { addNewComment} from "../../../../../../features/comments/commentsSlice";
import { Input } from 'antd';


const AddComment = ({postId}) => {
  const initialState = {
    title:"",
    body:"",
    image:""
  };
  const [formData, setFormData] = useState(initialState);
  const { title,body,image } = formData;

  const dispatch = useDispatch();

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
        const patata ={formData,postId}
        
      dispatch(addNewComment(patata));
    
  }; 
  return (
    <div className="centerAddComment">
    <form className='formComment' onSubmit={onSubmit}>
        <label htmlFor="title">Título del comentario:</label> 
      <Input type="text" name="title" value={title} onChange={onChange} required/> 
      <label htmlFor="body">Cuerpo del comentario:</label> 
      <Input  type="text" name="body" value={body} onChange={onChange} required/> 
      <input 
       onChange={onChange}
       type="file" value={image} name='image'/>
      <input type="submit" />
    </form>
    </div>
  );
};

export default AddComment;