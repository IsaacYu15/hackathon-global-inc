const getNavData = (loggedIn, logoutFunction) => {
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
