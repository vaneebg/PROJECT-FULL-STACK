import {  useSelector } from "react-redux";

const URL = process.env.REACT_APP_URL

const Following = () => {
    const { user, userProfile} = useSelector((state) => state.auth);

  return (
   <>
   {window.location.pathname.includes('profile') ?
      user?.user.following?.map((follow,i)=>{return(
        <div key={i}>
          {follow.image ? <img className='imgUserC'src={URL+"/images/users/" + follow?.image} alt=''/> : null}
          {follow.username}
        </div>)})
  :
      userProfile?.user.following?.map((follow,i)=>{return(
        <div key={i}>
          {follow.image ? <img className='imgUserC'src={URL+"/images/users/" + follow?.image} alt=''/> : null}
          {follow.username}
        </div>)})
  }
   </>
  )
}

export default Following