import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Classes from "../Pages/Classes/Classes";
import AddClass from "../Pages/Dashboard/AddClass";
import AdminHome from "../Pages/Dashboard/AdminHome";
import ClassList from "../Pages/Dashboard/ClassList";
import Dashboard from "../Pages/Dashboard/Dashboard";
import EnrollClasses from "../Pages/Dashboard/EnrollClasses";
import InstructorHome from "../Pages/Dashboard/InstructorHome";
import ManageClasses from "../Pages/Dashboard/ManageClasses";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import MySelectedClasses from "../Pages/Dashboard/MySelectedClasses";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import StudentHome from "../Pages/Dashboard/StudentHome";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";


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
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "studenthome",
                element: <StudentHome></StudentHome>
            },
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
                path: "adminhome",
                element:<AdminHome></AdminHome>
            },
            {
                path: "manageclasses",
                element:<ManageClasses></ManageClasses>
            },
            {
                path: "manageusers",
                element:<ManageUsers></ManageUsers>
            },
            //instructor dashboard
            {
                path: "instructorhome",
                element:<InstructorHome></InstructorHome>
            },
            {
                path: "addclass",
                element:<AddClass></AddClass>
            },
            {
                path: "classlist",
                element:<ClassList></ClassList>
            },
        ]
    }
]);

export default router
