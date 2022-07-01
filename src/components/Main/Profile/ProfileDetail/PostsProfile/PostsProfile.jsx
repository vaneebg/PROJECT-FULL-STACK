import React from 'react'
import { useSelector } from "react-redux";



const PostsProfile = () => {

  const { user } = useSelector((state) => state.auth);

      const post =user.user.postsId.map(el=>{
        console.log(el.image)
    return(
        <>
                {el.image ? <img src={"http://localhost:8080/images/posts/" + el.image} alt=''/> : null}

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