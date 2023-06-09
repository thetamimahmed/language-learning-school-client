import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Classes from "../Pages/Classes/Classes";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";


 const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path:'instructors',
                element: <Instructors></Instructors>
            },
            {
                path:'classes',
                element: <Classes></Classes>
            },
            {
                path:'login',
                element: <Login></Login>
            },
            {
                path:'register',
                element: <Register></Register>
            },
        ]
    },
]);

export default router
