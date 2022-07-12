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

const { isError, isSuccess,message} = useSelector((state) => state.auth);

useEffect(() => {
            if (isError) {
              notification.error({ message: "Error", description: message });
            }
            if (isSuccess) {
              notification.success({ message: "Éxito", description: message });
            }
            dispatch(reset());
          }, [isError, isSuccess, message]);



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