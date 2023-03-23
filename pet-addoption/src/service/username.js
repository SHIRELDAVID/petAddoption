const getUserName = () => {
  return localStorage.getItem("username");
};

const setUserName = (username) => {
  localStorage.setItem("username", username);
};

export { getUserName, setUserName };
