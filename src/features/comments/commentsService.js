import axios from "axios";
const URL = process.env.REACT_APP_URL



const addNewComment = async (commentData) => {
  const {formData, postId}=commentData
  console.log(postId)
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(URL + "/comments/idpost/"+postId,formData,{
    headers: {
      authorization: user?.user.tokens[0],
    },
  });
  return res.data.comment;
};

const commentsService = {
  addNewComment
};

export default commentsService;