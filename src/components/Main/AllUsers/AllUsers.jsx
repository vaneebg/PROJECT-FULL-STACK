
import { allUsers } from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from 'react';
import User from "./User/User";

const AllUsers = () => {
  const dispatch = useDispatch();

  

    useEffect(() => {
      dispatch(allUsers()); 
        }, [allUsers]);

  return (
    <div>Usuarios:
<User/>
</div>
  )
}

export default AllUsers