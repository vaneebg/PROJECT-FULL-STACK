import axios from "axios";
const URL = process.env.REACT_APP_URL



const addNewComment = async (commentData, id) => {
  console.log(id)
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(URL + "/comments/idpost/"+id,commentData,{
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