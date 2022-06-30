import axios from "axios";

const API_URL = "http://localhost:8080";

const register = async (userData) => {
  const res = await axios.post(API_URL + "/users/", userData);
  return res.data;
};

const login = async(userData)=>{
  const res = await axios.post(API_URL + '/users/login',userData)
  if (res.data) {
  localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data
  }

  const logout = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.user.tokens[0])
    const res = await axios.delete(API_URL + "/users/logout", {
      headers: {
        authorization: user?.user.tokens[0],
      },
    });
    if (res.data) {
      localStorage.removeItem("user");
    }
    return res.data;
  };
const authService = {
  register,
  login,
  logout
  
};

export default authService;