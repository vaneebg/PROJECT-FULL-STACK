import axios from "axios";

const API_URL = "http://localhost:8000";

const getAll = async () => {
  const res = await axios.get(API_URL + "/posts",{},{
    headers: {
        authorization: token,
    }
});
  return res.data;
};



const postsService = {
  getAll,
 
};

export default postsService;