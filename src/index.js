import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Teams from "./Components/teams.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/teams",
    element: <Teams />,
  },
]);
root.render(<RouterProvider router={router} />);
