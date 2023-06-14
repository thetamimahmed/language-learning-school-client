import { Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Classes from "../Pages/Classes/Classes";

const AnimateRoute = () => {
    const location = useLocation();

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes key={location.pathname} location={location}>
                <Route path="/" element={<Home></Home>} />
                <Route path="instructor" element={<Instructors></Instructors>} />
                <Route path="dashboard" element={<Dashboard></Dashboard>} />
                <Route path="classes" element={<Classes></Classes>} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimateRoute;