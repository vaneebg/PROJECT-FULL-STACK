import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { login,reset } from '../../../../features/auth/authSlice'
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

  const [formDataLogin, setFormDataLogin] = useState(initialState);
  const { email, password } = formDataLogin;

  const dispatch = useDispatch();

  
  const { isError, isSuccess,message, messageLogout,messageDelete} = useSelector((state) => state.auth);

  useEffect(() => {
    if(messageLogout){
      notification.success({ message: "Éxito", description: messageLogout });

    }
    if(messageDelete){
      notification.success({ message: "Éxito", description: messageDelete });

     }
    if (isError) {
      notification.error({ message: "Error", description: message });
    }
    if (isSuccess) {
      notification.success({ message: "Éxito, holii", description: message });
      setTimeout(() => {
        navigate("/main");
      }, 2000);
    }
    dispatch(reset());
  }, [isError, isSuccess, message, messageLogout]);



  const onChange = (e) => {
    setFormDataLogin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(login(formDataLogin));
   
    }

return (
  <div className="centerLog login">
 
 <form className='formLog' onSubmit={onSubmit}>
 <label className="labelR" htmlFor="email">Correo:</label> 
 <Input prefix={<MailOutlined/>} type="email" name="email" value={email} onChange={onChange}/>
 <label className="labelR" htmlFor="password">Contraseña:</label>
 <Input prefix={<LockOutlined/>} type="password" name="password" value={password} onChange={onChange}/>
 <button type="submit">Login</button>
 </form>
  </div>
)
}
export default Login
