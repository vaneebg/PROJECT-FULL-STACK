import axios from "axios";
const URL = process.env.REACT_APP_URL


const register = async (userData) => {
  const res = await axios.post(URL + "/users/", userData);
  return res.data;
};

const login = async(userData)=>{
  const res = await axios.post(URL + '/users/login',userData)
  if (res.data) {
  localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data
  }

  const logout = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.delete(URL + "/users/logout", {
      headers: {
        authorization: user?.user.tokens[0],
      },
    });
    if (res.data) {
      localStorage.removeItem("user");
    }
    return res.data;
  };
  const myInfo = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.get(URL + "/users/myinfo", {
      headers: {
        authorization: user?.user.tokens[0],
      },
    });
    return res.data;
  };
const authService = {
  register,
  login,
  logout,
  myInfo
  
};

export default authService;