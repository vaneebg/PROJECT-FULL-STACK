import { notification } from "antd";
import {  useState } from "react";
import { useDispatch} from "react-redux";
import { register} from "../../../../features/auth/authSlice";
import { UserOutlined, MailOutlined,ContactsOutlined, LockOutlined} from '@ant-design/icons';
import { Input } from 'antd';
import './Register.scss'

const Register = () => {
  const initialState = {
    username: "",
    age:"",
    email: "",
    password: "",
    password2: "",
    image:""
  };
  const [formData, setFormData] = useState(initialState);
  const { username, age, email, password, password2,image } = formData;

  const dispatch = useDispatch();


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      notification.error({ message: "Las contraseñas no coindicen" });
      
    } else {
        const formData = new FormData();
        if (e.target.image.files[0]) formData.set('image', e.target.image.files[0]);
        formData.set('username', e.target.username.value)
        formData.set('age', e.target.age.value)
        formData.set('email', e.target.email.value)
        formData.set('password', e.target.password.value)
    console.log('form enviado', formData)
      dispatch(register(formData));
    }
  }; 
  return (
    <div className="centerReg">
    <form className='formReg' onSubmit={onSubmit}>
        <label htmlFor="username">Nombre de usuario:</label> 
      <Input prefix={<UserOutlined />} type="text" name="username" value={username} onChange={onChange} /> 
      <label htmlFor="email">Correo: </label> 
      <Input prefix={<MailOutlined/>} type="email" name="email" value={email} onChange={onChange} /> 
      <label htmlFor="age">Edad:</label> 
      <Input prefix={<ContactsOutlined />}type="number" min="16" name="age" value={age} onChange={onChange} /> 
<label htmlFor="password">Introduce tu contraseña:</label> 
      <Input prefix={<LockOutlined/>}
        type="password"
        name="password"
        value={password}
        onChange={onChange}
      /> 
      <label htmlFor="password2">Introduce de nuevo tu contraseña:</label> 

      <Input prefix={<LockOutlined/>}
        type="password"
        name="password2"
        value={password2}
        onChange={onChange}
      />
      <input 
       onChange={onChange}
       type="file" value={image} name='image'/>
      <input type="submit" />
    </form>
    </div>
  );
};

export default Register;