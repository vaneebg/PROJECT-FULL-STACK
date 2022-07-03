
import {  useSelector } from "react-redux";


const User = () => {
    const { users } = useSelector((state) => state.auth);

const user=users.map(el=>{return(<div className='connects' key={el._id}>
         {el.image ? <img className='imgUserC'src={"http://localhost:8080/images/users/" + el.image} alt=''/> : null}
    {el.username}
    
    </div>
    )})
  return (<>
   {user}
   </>
  )
}

export default User