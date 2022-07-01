import axios from "axios";

const API_URL = "http://localhost:8080";

const getAll = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/posts/",{
    headers: {
      authorization: user?.user.tokens[0],
    },
  });
  return res.data;
};
const getPostById = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/posts/id/" + _id, {
    headers: {
      authorization: user?.user.tokens[0],
    },
  });
  return res.data;
  };

const like = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(API_URL + "/posts/likes/"+_id,{}, {
      headers: {
        authorization: user?.user.tokens[0],
      },
    } );
  return res.data.post;
};

const dislike = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(API_URL + "/posts/dislikes/"+_id,{}, {
      headers: {
        authorization: user?.user.tokens[0],
      },
    } );
  return res.data.post;
};

const addNewPost = async (postData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(API_URL + "/posts/",postData,{
    headers: {
      authorization: user?.user.tokens[0],
    },
  });
  console.log(res.data)
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