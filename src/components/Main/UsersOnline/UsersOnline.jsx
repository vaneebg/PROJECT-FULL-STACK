import { useDispatch,useSelector} from "react-redux";
import { useEffect } from 'react';
import { allConnects } from "../../../features/auth/authSlice";
import { Link } from 'react-router-dom'
import { Tooltip } from 'antd';


import './UsersOnline.scss'

const URL = process.env.REACT_APP_URL


const UsersOnline = () => {
  const dispatch = useDispatch();
  const { usersOnline } = useSelector((state) => state.auth);
  const userLocal = JSON.parse(localStorage.getItem("user"));


    useEffect(() => {
      dispatch(allConnects()); 
        }, [allConnects]);


const userOnline=usersOnline?.map((el,i)=>{
 
    if(el._id!==userLocal.user._id){

            return(<>
                 {el.image ? 
                 
                 <Tooltip placement="bottom" color="purple" title={el.username}>
 <Link to={"/user/" + el._id}>  <img className='imgUserOnline animate__animated animate__bounceInUp'src={URL+"/images/users/" + el.image} alt=''/> </Link>               </Tooltip>
                : null}
                   </>
              )}})
            


  return (<div className="containerStories">
  <div className="stories">
  
      
{userOnline}

</div>
</div>
  )
}

export default UsersOnline;