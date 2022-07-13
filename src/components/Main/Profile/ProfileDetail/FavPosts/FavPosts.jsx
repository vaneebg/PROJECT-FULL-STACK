import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { like, dislike } from "../../../../../features/posts/postsSlice";
import { myInfo } from '../../../../../features/auth/authSlice';
import NotFav from './NotFav/NotFav';
import { HeartOutlined} from "@ant-design/icons";
import { Tooltip } from 'antd';
import './FavPosts.scss'

const URL = process.env.REACT_APP_URL


const FavPosts = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(myInfo());
  }, [myInfo, posts]);

  if (isLoading) {
    return <h1>Cargando posts..</h1>;
  }

  const postFav = user.user.favList?.map((post, i) => {
    const isAlreadyLiked = post.likes?.includes(user?.user._id);

    return (
      <div key={i} className="postContentProfile">
        <Tooltip title={"Click para más info sobre: " + post.title} color='purple' key='purple'>
          <Link to={"/post/" + post._id}>
            {post.image ? <img className='postsProfile' src={URL + "/images/posts/" + post.image} alt='' /> : null}
          </Link>
        </Tooltip>
        <div className="iconsFavPost">
          {isAlreadyLiked ? (
            <i className="fa-solid fa-heart fa-beat" onClick={isAlreadyLiked ? () => dispatch(dislike(post._id)) : () => dispatch(like(post._id))} ></i>
          ) : (
            <HeartOutlined onClick={isAlreadyLiked ? () => dispatch(dislike(post._id)) : () => dispatch(like(post._id))} />
          )}
          <span>&nbsp;{post.likes?.length} Likes</span>
        </div>
      </div>
    )
  }
  )
  return (
    postFav.length !== 0 ? <div className="postsUser">
      {postFav}
    </div> : <NotFav />
  )
}

export default FavPosts