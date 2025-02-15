const getNavData = (logoutFunction) => {
  var loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  return [
    {
      id: 0,
      link: "/",
      title: "Events",
    },
    {
      id: 1,
      link: loggedIn ? "/" : "/login",
      title: loggedIn ? "Logout" : "Login",
      action: loggedIn ? logoutFunction : null, 
    },
  ];
};

export default getNavData;
