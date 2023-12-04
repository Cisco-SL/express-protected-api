import { createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import Home from './componentes/Home'
import SignUp from './componentes/SignUp.jsx'
import Login from './componentes/Login.jsx'
import NewPost from './componentes/NewPost.jsx'
import Post from "./componentes/Post.jsx";
import EditPost from "./componentes/EditPost.jsx";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "write",
          element: <NewPost />,
        }
        ,
        {
          path: "post/:id",
          element: <Post />,
        },
        {
          path: "post/:id/edit",
          element: < EditPost />,
        }
      ],
    },
  ]);

  export default router;