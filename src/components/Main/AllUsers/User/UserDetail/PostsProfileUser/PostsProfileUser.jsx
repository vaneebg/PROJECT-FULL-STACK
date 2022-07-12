import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { Tooltip } from 'antd';
import NotPublicPost from "../../../../NotPublicPost/NotPublicPost";

const URL = process.env.REACT_APP_URL


const PostsProfileUser = () => {

  const { userProfile, isLoading } = useSelector((state) => state.auth);
  if (isLoading) {
    return <h1>Cargando posts..</h1>;
  }
      const post =userProfile?.user.postsId.map((el,i)=>{
    return(  <div key={i}  className="postContentProfile">
      <Tooltip title={"Click para más info sobre: "+el.title}color='purple' key='purple'>
  <Link to={"/post/" + el._id}>
  
     {el.image ? <img className='postsProfile animate__animated animate__fadeInLeft' src={URL+"/images/posts/" + el.image} alt=''/> : null}
        </Link>  
        </Tooltip>
     </div>
      

        
    )
    })

    console.log(post.length)
  return (
    post.length!==0 ? <div className="postsUser">
    {post}
    </div>: <NotPublicPost/>
   
  )
}


export default PostsProfileUser