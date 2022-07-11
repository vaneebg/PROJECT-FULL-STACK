import axios from "axios";
const URL = process.env.REACT_APP_URL

console.log(URL)
const register = async (userDataReg) => {
  const res = await axios.post(URL + "/users/", userDataReg);
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
  const allUsers = async () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.get(URL + "/users/", {
      headers: {
        authorization: user?.user.tokens[0],
      },
    });
    return res.data;
  };
  const editUser = async (userDataEdit) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.put(URL + "/users/modifyUser", userDataEdit, {
      headers: {
        authorization: user?.user.tokens[0],
      },
    });
    return res.data;
  };
  const follow = async (_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.put(URL + "/users/followUser/"+_id,{}, {
        headers: {
          authorization: user?.user.tokens[0],
        },
      } );
    return res.data;
  };
  const unfollow = async (_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.put(URL + "/users/unfollowUser/"+_id,{}, {
        headers: {
          authorization: user?.user.tokens[0],
        },
      } );
    return res.data;
  };
  const getUserById = async (_id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.get(URL + "/users/id/" + _id, {
      headers: {
        authorization: user?.user.tokens[0],
      },
    });
    return res.data;
    };
    const allConnects = async () => {

      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(URL + "/users/allconnects", {
        headers: {
          authorization: user?.user.tokens[0],
        },
      });
      return res.data;
    };
    const deleteUser = async () => {

      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.delete(URL + "/users/yourUserDelete", {
        headers: {
          authorization: user?.user.tokens[0],
        },
      });
       if (res.data) {
        localStorage.removeItem("user");
      }
      return res.data;
    };
    const deleteUserAdmin  = async (_id) => {

      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.delete(URL + "/users/userId/"+_id, {
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
  myInfo,
  allUsers,
  editUser,
  follow,
  unfollow,
  getUserById,
  allConnects,
  deleteUser,
  deleteUserAdmin
  
};

export default authService;