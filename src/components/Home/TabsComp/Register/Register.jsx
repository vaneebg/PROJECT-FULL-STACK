import { notification, Input } from "antd";
import {  useState,useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { register,reset} from "../../../../features/auth/authSlice";
import { UserOutlined, MailOutlined,ContactsOutlined, LockOutlined} from '@ant-design/icons';

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
  const [formDataReg, setFormDataReg] = useState(initialState);
  const { username, age, email, password, password2,image } = formDataReg;

  const dispatch = useDispatch();
  

  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({ message: "Éxito register", description: message });
    }
    if (isError) {
      notification.error({ message: "Error register", description: message });
    }
    dispatch(reset())
  }, [isSuccess, isError, message]);


  const onChange = (e) => {
    setFormDataReg((prevState) => ({
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
      dispatch(register(formData));
    }
  }; 
  return (
    <div className="centerReg register">
    <form className='formReg' onSubmit={onSubmit}>
        <label htmlFor="username">Nombre de usuario:</label> 
      <Input prefix={<UserOutlined />} placeholder='pepito' type="text" name="username" value={username} onChange={onChange} required/> 
      <label htmlFor="email">Correo: </label> 
      <Input prefix={<MailOutlined/>} placeholder='pepito@gmail.com' type="email" name="email" value={email} onChange={onChange} required/> 
      <label htmlFor="age">Edad:</label> 
      <Input prefix={<ContactsOutlined />}type="number" min="16" name="age" value={age} onChange={onChange} required/> 
<label htmlFor="password">Introduce tu contraseña:</label> 
      <Input prefix={<LockOutlined/>}
        type="password"
        name="password"
        placeholder='*******'
        value={password}
        onChange={onChange} required
      /> 
      <label htmlFor="password2">Introduce de nuevo tu contraseña:</label> 

      <Input prefix={<LockOutlined/>}
        type="password"
        name="password2"
        placeholder='*******'
        value={password2}
        onChange={onChange} required
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