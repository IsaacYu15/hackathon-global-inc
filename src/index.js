import ReactDOM from 'react-dom/client'
import './index.css'
import EventList from "./sections/eventlist/EventList.jsx"
import Login from "./sections/login/Login.jsx"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter ([
  {
      path: "/events",
      element: <EventList/>,
  },

  {
      path: "/login",
      element: <Login/>,
  }
]);

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <RouterProvider router={router}/>
);
