
import {  useSelector } from "react-redux";

const URL = process.env.REACT_APP_URL


const Followers = () => {
    const { user} = useSelector((state) => state.auth);

    console.log(user.user.followers)
    const followers=user.user.followers?.map(follow=>{return(
    <div>
 {follow.username}
 {follow.image ? <img className='imgUserC'src={URL+"/images/users/" + follow?.image} alt=''/> : null}
    </div>)})
  return (
   <>{followers}</>
  )
}

export default Followers