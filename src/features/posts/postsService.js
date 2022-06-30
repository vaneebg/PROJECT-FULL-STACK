import axios from "axios";

const API_URL = "http://localhost:8080";

const getAll = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/posts/",{
    headers: {
      authorization: user?.user.tokens[0],
    },
  });
  return res.data;//action.payload
};


const postsService = {
  getAll,
 
};

export default postsService;