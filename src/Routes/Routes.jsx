import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Classes from "../Pages/Classes/Classes";
import AddClass from "../Pages/Dashboard/AddClass";
import ClassList from "../Pages/Dashboard/ClassList";
import Dashboard from "../Pages/Dashboard/Dashboard";
import EnrollClasses from "../Pages/Dashboard/EnrollClasses";
import ManageClasses from "../Pages/Dashboard/ManageClasses";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import MySelectedClasses from "../Pages/Dashboard/MySelectedClasses";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import UpdateClass from "../Pages/Dashboard/UpdateClass";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AdminRoute from "./AdminRoute";
import InstructrorRoute from "./InstructrorRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
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
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "myclasses",
                element: <MySelectedClasses></MySelectedClasses>
            },
            {
                path: "enrollclasses",
                element: <EnrollClasses></EnrollClasses>
            },
            {
                path: "payment",
                element: <Payment></Payment>
            },
            {
                path: "paymenthistory",
                element: <PaymentHistory></PaymentHistory>
            },
            //admin dashboard
            {
                path: "manageclasses",
                element:<AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },
            {
                path: "manageusers",
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            //instructor dashboard
            {
                path: "addclass",
                element:<InstructrorRoute><AddClass></AddClass></InstructrorRoute>
            },
            {
                path: "classlist",
                element:<InstructrorRoute><ClassList></ClassList></InstructrorRoute>
            },
            {
                path: "updateclass",
                element:<InstructrorRoute><UpdateClass></UpdateClass></InstructrorRoute>
            },
        ]
    }
]);

export default router
