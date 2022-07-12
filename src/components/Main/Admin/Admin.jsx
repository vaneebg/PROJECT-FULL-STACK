import { allUsers,reset } from "../../../features/auth/authSlice";
import User from "../AllUsers/User/User";
import { useDispatch,useSelector} from "react-redux";
import { useEffect } from 'react';
import {notification} from 'antd';
import './Admin.scss'


const Admin = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allUsers()); 
          }, []);



    return (
   <div className="backg">
      <span className="delete">Borrar usuarios:</span>
<div className="centerD">
  <div className="usersDelete">
<User/>
</div>
</div>
    </div>
    )
    }


    export default Admin