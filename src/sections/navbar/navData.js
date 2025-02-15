const getNavData = (logoutFunction) => {
  {/*fetching isLoggedIn is more robust than saving a logged in variable with useState*/}
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
