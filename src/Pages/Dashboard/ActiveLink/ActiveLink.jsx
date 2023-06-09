import { NavLink } from "react-router-dom";

const ActiveLink = ({ to ,children }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-gradient-to-l from-[#84D19F]  to-transparent rounded-lg text-lg" : ""
            }
        >
            {children}
        </NavLink>
    );
};

export default ActiveLink;