import { useDispatch, useSelector } from "react-redux";


const Post = () => {
  const { posts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
const {Number_of_posts:number,posts:postsEl}=posts
console.log(postsEl)
  return <div>holi</div>;
};

export default Post;