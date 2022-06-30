import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../../../features/auth/authSlice'
import {  Input, notification } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

import './Login.scss'

const Login = () => {
  const initialState = {
    email: "",
    password: "",
   
  };
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const dispatch = useDispatch();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault()
    console.log('login enviado',formData)

    dispatch(login(formData));
    setTimeout(() => {
      navigate("/main")
      
    }, 3000)
    return notification.success({
      message: "Bienvenidx!",
      description: "Holiiis",
    });
    }

return (
  <div className="centerLog">
 
 <form className='formLog' onSubmit={onSubmit}>
 <label htmlFor="email">Correo:</label> 
 <Input prefix={<MailOutlined/>} type="email" name="email" value={email} onChange={onChange}/>
 <label htmlFor="password">Contraseña:</label>
 <Input prefix={<LockOutlined/>} type="password" name="password" value={password} onChange={onChange}/>
 <button type="submit">Login</button>
 </form>
  </div>
)
}
export default Login
