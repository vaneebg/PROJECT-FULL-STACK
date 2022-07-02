import axios from "axios";
const URL = process.env.REACT_APP_URL




const getAll = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(URL + "/posts/",{
    headers: {
      authorization: user?.user.tokens[0],
    },
  });
  return res.data;
};
const getPostById = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(URL + "/posts/id/" + _id, {
    headers: {
      authorization: user?.user.tokens[0],
    },
  });
  return res.data;
  };

const like = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(URL + "/posts/likes/"+_id,{}, {
      headers: {
        authorization: user?.user.tokens[0],
      },
    } );
  return res.data.post;
};

const dislike = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(URL + "/posts/dislikes/"+_id,{}, {
      headers: {
        authorization: user?.user.tokens[0],
      },
    } );
  return res.data.post;
};

const addNewPost = async (postData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(URL + "/posts/",postData,{
    headers: {
      authorization: user?.user.tokens[0],
    },
  });
  return res.data;
};

const postsService = {
  getAll,
 like,
 dislike,
 addNewPost,
 getPostById
};

export default postsService;