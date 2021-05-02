const handleLogout = (e) => {
  localStorage.removeItem("token");
};

export default handleLogout;
