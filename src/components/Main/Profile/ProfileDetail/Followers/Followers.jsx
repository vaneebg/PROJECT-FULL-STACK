
import {  useSelector } from "react-redux";


const URL = process.env.REACT_APP_URL


const Followers = () => {
    const { user, userProfile} = useSelector((state) => state.auth);

  
   return(
   <>
    {window.location.pathname.includes('profile') ?
    
       user?.user.followers?.map((follow,i)=>{return(
         <div key={i}>
           {follow.username}
           {follow.image ? <img className='imgUserC'src={URL+"/images/users/" + follow?.image} alt=''/> : null}
         </div>)})
   :
       userProfile?.user.followers?.map((follow,i)=>{return(
         <div key={i}>
           {follow.username}
           {follow.image ? <img className='imgUserC'src={URL+"/images/users/" + follow?.image} alt=''/> : null}
         </div>)})
   }
   </>
   )

  
}

export default Followers