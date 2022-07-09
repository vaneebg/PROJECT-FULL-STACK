import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import {  notification } from 'antd'
import {  useSelector, useDispatch } from "react-redux";
import { follow,unfollow,reset, deleteUserAdmin } from "../../../../features/auth/authSlice";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const URL = process.env.REACT_APP_URL



const User = () => {
    const { users,user } = useSelector((state) => state.auth);
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();

    const { isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
     
      if (isError) {
        notification.error({ message: "Error", description: message });
      }
      if (isSuccess) {
        notification.success({ message: "Éxito", description: message });
        
      }
      dispatch(reset());
    }, [isError, isSuccess, message]);



const user1=users.map((el,i)=>{
  if(el._id!==userLocal.user._id){
  const isAlreadyFollowing=el.followers?.includes(userLocal.user._id)
  return(<div className='connects' key={i}>
         {el.image ? <img className='imgUserC'src={URL+"/images/users/" + el.image} alt=''/> : null}
    {el.username}
    {user.user.role!=="admin" ?   <div className="icons">
       {isAlreadyFollowing ? (
        <HeartFilled onClick={ isAlreadyFollowing? () => dispatch(unfollow(el._id)) : () => dispatch(follow(el._id)) }/>
        ) : (
        <HeartOutlined onClick={ isAlreadyFollowing? () =>  dispatch(unfollow(el._id)) : () => dispatch(follow(el._id)) }/>
        )}
        
              </div>: null}
  
              <Link to={"/user/" + el._id}>Ver perfil</Link>
              {user.user.role==="admin" ?  <button  onClick={() => dispatch(deleteUserAdmin((el._id)))}>Eliminar usuario</button> : null}
                 </div>
    )}})
  return (<>
   {user1}
   </>
  )
}

export default User