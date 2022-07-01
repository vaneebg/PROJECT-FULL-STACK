import React from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'


import './PostsProfile.scss'

const PostsProfile = () => {

  const { user } = useSelector((state) => state.auth);

      const post =user.user.postsId.map((el)=>{
    return(
        <><Link to={"/post/" + el._id}>
     {el.image ? <img key={el._id} className='postsProfile' src={"http://localhost:8080/images/posts/" + el.image} alt=''/> : null}
        </Link>

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