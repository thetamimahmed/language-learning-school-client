import {Link} from "react-router-dom"
const NavBar = () => {
    const navInfo = <>
        <li className="text-lg"><Link to="/">Home</Link></li>
        <li className="text-lg"><Link to="/">Instructors</Link></li>
        <li className="text-lg"><Link to="/">Classes</Link></li>
    </>
    return (
        <div className="navbar bg-base-100 max-w-7xl mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navInfo}
                    </ul>
                </div>
                <a className="normal-case text-lg lg:text-2xl font-bold text-[#584B9F]">Language <span className="text-[#84D19F]"> Learning</span> <br />School</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                   {navInfo}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn bg-[#84D19F] text-white hover:bg-[#584B9F]">Log in</a>
            </div>
        </div>
    );
};

export default NavBar;