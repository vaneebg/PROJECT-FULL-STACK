import axios from "axios";
const URL = process.env.REACT_APP_URL



const addNewComment = async (commentData, _id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(URL + "/idpost/"+_id,commentData,{
    headers: {
      authorization: user?.user.tokens[0],
    },
  });
  console.log(res.data)
  return res.data;
};

const commentsService = {
  addNewComment
};

export default commentsService;