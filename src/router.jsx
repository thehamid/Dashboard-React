import { createBrowserRouter } from "react-router-dom";
import IdentityLayout from "./layouts/identity-layout";
import Login, {loginAction} from "./features/identity/components/login.jsx";
import Register, {registerAction} from "./features/identity/components/register.jsx";

const router = createBrowserRouter([
    {
        element: <IdentityLayout />,
        children: [
            {
                path: 'login',
                element: <Login/>,
                action: loginAction,
                errorElement: <Login/>
            }, {
                path: 'register',
                element: <Register/>,
                action: registerAction,
                errorElement: <Register/>
            }
        ]
  }
])


export default router