import { useDispatch,useSelector} from "react-redux";
import { useEffect } from 'react';
import { allConnects } from "../../../features/auth/authSlice";
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
                   {el.image ? <img className='imgUserConnect'src={URL+"/images/users/" + el.image} alt=''/> : null}
                   </>
              )}})
            


  return (<div className="stories">
  
      
{userOnline}

</div>
  )
}

export default UsersOnline;