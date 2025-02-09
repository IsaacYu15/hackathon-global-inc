const getNavData = (loggedIn, logoutFunction) => {
  return [
    {
      id: 0,
      link: "/events",
      title: "Events",
    },
    {
      id: 1,
      link: loggedIn ? "/events" : "/login",
      title: loggedIn ? "Logout" : "Login",
      action: loggedIn ? logoutFunction : null, 
    },
  ];
};

export default getNavData;
