import {  useState } from "react";
import { editComment,reset} from "../../../../../../features/comments/commentsSlice";
import { Input } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { notification } from "antd";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";



const EditComment = ({commentId}) => {
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
        const data ={formData,commentId}
        
      dispatch(editComment(data));
      setFormData(initialState)
   
    
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

export default EditComment;