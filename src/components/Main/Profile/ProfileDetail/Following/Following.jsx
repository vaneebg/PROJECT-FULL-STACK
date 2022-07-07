
import {  useSelector } from "react-redux";


const URL = process.env.REACT_APP_URL


const Following = () => {
    const { user} = useSelector((state) => state.auth);

    const following=user.user.following?.map((follow,i)=>{return(
    <div key={i}>
 {follow.username}
 {follow.image ? <img className='imgUserC'src={URL+"/images/users/" + follow?.image} alt=''/> : null}
    </div>)})
  return (
   <>{following}</>
  )
}

export default Following