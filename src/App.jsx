import Buttons from "./components/Buttons"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import firebaseConfig from "./firebase.config"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Main from "./layout/Main"
import Home from "./home/Home"
import ForgetPassword from "./forgetpassword/ForgetPassword"
import Chat from "./pages/Chat"

const router = createBrowserRouter([
  {
    path:"/",
    element:<Main/>,
    children:[
      {
        path:"/",
        element:<Registration/>,
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/home",
        element:<Home/>
      },
      {
        path:"/chat",
        element:<Chat/>
      },
      {
        path:"/forgetpassword",
        element:<ForgetPassword/>
      }
    ],

    
  },
])

function App() {

  return (
   <div>

     <RouterProvider router={router} />
  
    

   </div>
  )
}

export default App
