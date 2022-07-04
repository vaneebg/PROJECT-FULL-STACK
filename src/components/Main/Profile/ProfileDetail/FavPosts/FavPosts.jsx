import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { Tooltip } from 'antd';
const URL = process.env.REACT_APP_URL


const FavPosts = () => {
    const { user} = useSelector((state) => state.auth);

  

const postFav=user.user.favList?.map((post,i)=>{return(
    <div key={i}  className="postContentProfile">
    <Tooltip title={"Click para más info sobre: "+post.title}color='purple' key='purple'>
<Link to={"/post/" + post._id}>

   {post.image ? <img className='postsProfile' src={URL+"/images/posts/" + post.image} alt=''/> : null}
      </Link>  
      </Tooltip>
   </div>
)}
  )
  return(
    <div className='postsUser'>
    {postFav}
    </div>
  )
}

export default FavPosts