import axios from "axios";
const URL = process.env.REACT_APP_URL



const addNewComment = async (commentData) => {
  const {formData, postId}=commentData
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(URL + "/comments/idpost/"+postId,formData,{
    headers: {
      authorization: user?.user.tokens[0],
    },
  });
  return res.data.comment;
};
const likeComment = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(URL + "/comments/likesComment/"+_id,{}, {
      headers: {
        authorization: user?.user.tokens[0],
      },
    } );
  return res.data.comment;
};
const dislikeComment = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(URL + "/comments/dislikesComment/"+_id,{}, {
      headers: {
        authorization: user?.user.tokens[0],
      },
    } );
  return res.data.comment;
};

const commentsService = {
  addNewComment,
  likeComment,
  dislikeComment
};

export default commentsService;