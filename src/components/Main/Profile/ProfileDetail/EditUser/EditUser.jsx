import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, reset } from '../../../../../features/auth/authSlice'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { notification, Input } from "antd";


const EditUser = () => {
  const initialState = {
    username: "",
    password: "",
    image: ""
  };
  const [formDataEditU, setFormDataEditU] = useState(initialState);
  const { username, password, image } = formDataEditU;

  const dispatch = useDispatch();
  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({ message: "Éxito cambiar perfil", description: message });
    }
    if (isError) {
      notification.error({ message: "Error cambiar perfil", description: message });
    }
    dispatch(reset())
  }, [isSuccess, isError, message]);

  const onChange = (e) => {
    setFormDataEditU((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (e.target.image.files[0]) formData.set('image', e.target.image.files[0]);
    formData.set('username', e.target.username.value)
    formData.set('password', e.target.password.value)
    dispatch(editUser(formData));
    setFormDataEditU(initialState)
  };
  return (
    <div className="centerReg">
      <form className='formReg' onSubmit={onSubmit}>
        <label htmlFor="username">Nuevo nombre de usuario:</label>
        <Input prefix={<UserOutlined />} type="text" name="username" value={username} onChange={onChange} required />
        <label htmlFor="password">Nueva contraseña:</label>
        <Input prefix={<LockOutlined />}
          type="password"
          name="password"
          value={password}
          onChange={onChange} required
        />
        <input
          onChange={onChange}
          type="file" value={image} name='image' />
        <input type="submit" />
      </form>
    </div>
  );
};

export default EditUser;