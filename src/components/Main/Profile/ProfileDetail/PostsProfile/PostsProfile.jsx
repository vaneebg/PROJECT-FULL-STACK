import React from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { Tooltip } from 'antd';


import './PostsProfile.scss'

const PostsProfile = () => {

  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <h1>Cargando posts..</h1>;
  }
      const post =user.user.postsId.map((el)=>{
    return(<>
      <Tooltip title="Click para más info"color='purple' key='purple'>
  <Link to={"/post/" + el._id}>
     {el.image ? <img key={el._id} className='postsProfile' src={"http://localhost:8080/images/posts/" + el.image} alt=''/> : null}
        </Link>  
        </Tooltip>
      

        </>
    )
    })

  return (
    <div className="postsUser">
        {post}
        </div>
  )
}


export default PostsProfile