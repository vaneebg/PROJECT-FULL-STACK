import { useDispatch } from "react-redux";
import { useState } from "react";
import { editPost } from "../../../../../features/posts/postsSlice";
import { useParams } from "react-router-dom";
import { Input } from "antd";


const EditPost = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();

  const initialState = {
    title: "",
    body: "",
    image: ""
  };
  const [formData, setFormData] = useState(initialState);
  const { title, body, image } = formData;

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
    const data = { formData, _id }
    dispatch(editPost(data));
    setFormData(initialState)
  };
  return (
    <div className="centerAddPost">
      <form className='formPost' onSubmit={onSubmit}>
        <label htmlFor="title">Título del post:</label>
        <Input type="text" name="title" value={title} onChange={onChange} required />
        <label htmlFor="body">Cuerpo del post:</label>
        <Input type="text" name="body" value={body} onChange={onChange} required />
        <input
          onChange={onChange}
          type="file" value={image} name='image' /> <br />
        <input type="submit" value='Publicar post' />
      </form>
    </div>
  );
};

export default EditPost;