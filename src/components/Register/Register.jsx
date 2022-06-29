import { notification } from "antd";
import {  useState } from "react";
import { useDispatch} from "react-redux";
import { register} from "../../features/auth/authSlice";

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
    
      dispatch(register(formData));
    }
  };
  return (
    <form onSubmit={onSubmit}>
        <label htmlFor="username">Nombre de usuario:</label> <br />
      <input type="text" name="username" value={username} onChange={onChange} /> <br />
      <label htmlFor="email">Correo: </label> <br />
      <input type="email" name="email" value={email} onChange={onChange} /> <br />
      <label htmlFor="age">Edad:</label> <br />
      <input type="number" name="age" value={age} onChange={onChange} /> <br />
<label htmlFor="password">Introduce tu contraseña:</label> <br />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
      /> <br />
      <label htmlFor="password2">Introduce de nuevo tu contraseña:</label> <br />

      <input
        type="password"
        name="password2"
        value={password2}
        onChange={onChange}
      />
      <input 
       onChange={onChange}
       type="file" value={image} name='image'/>
      <button>Subir foto</button>
      <input type="submit" />
    </form>
  );
};

export default Register;