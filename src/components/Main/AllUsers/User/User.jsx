import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow, reset, deleteUserAdmin } from "../../../../features/auth/authSlice";
import { notification, Popconfirm, Button } from 'antd'
import { RedditOutlined } from '@ant-design/icons';
import './User.scss'

const URL = process.env.REACT_APP_URL


const User = () => {
  const { users, user } = useSelector((state) => state.auth);
  const userLocal = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  const { isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Éxitoa", description: message, icon: (
          <RedditOutlined
            style={{
              color: '#4b0081',
            }} />
        ),
      });
    }
    dispatch(reset());
  }, [isSuccess]);



  const user1 = users.map((el, i) => {
    if (el._id !== userLocal.user._id) {
      const isAlreadyFollowing = el.followers?.includes(userLocal.user._id)
      if (el.username !== "ADMIN") {
        return (<div className='connects' key={i}>
          {el.image ? <img className='imgUserC' src={URL + "/images/users/" + el.image} alt='' /> : null}
          <div className="usernameEye">
            <span className="nameFollow"> {el.username}</span>
            <Link to={"/user/" + el._id}><i className="fa-solid fa-eye"></i></Link>
          </div>
          <div className="icons">
            {user.user.role !== "admin" ? <>
              {isAlreadyFollowing ? (
                <i className="fa-solid fa-people-group" onClick={isAlreadyFollowing ? () => dispatch(unfollow(el._id)) : () => dispatch(follow(el._id))}></i>
              ) : (
                <i className="fa-solid fa-person-walking-arrow-right" onClick={isAlreadyFollowing ? () => dispatch(unfollow(el._id)) : () => dispatch(follow(el._id))}></i>
              )}
            </> : null}
          </div>
          {user.user.role === "admin" ? <Popconfirm title="Seguro que quieres borrar este usuario?" placement="rightTop" onConfirm={() => dispatch(deleteUserAdmin((el._id)))} okText="Yes" cancelText="No">
            <Button>Eliminar usuario</Button>
          </Popconfirm> : null}
        </div>
        )
      }
    }
  })
  return (
  <>
    {user1}
  </>
  )
}

export default User