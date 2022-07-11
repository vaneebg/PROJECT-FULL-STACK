
import { useDispatch} from "react-redux";
import { useEffect } from 'react';
import { allUsers } from "../../../features/auth/authSlice";
import User from "./User/User";
import './AllUsers.scss'
const AllUsers = () => {
  const dispatch = useDispatch();

  

    useEffect(() => {
      dispatch(allUsers()); 
        }, [allUsers]);




        

  return (
    <div className="whoFollow">A quién seguir:
<User/>
</div>
  )
}

export default AllUsers