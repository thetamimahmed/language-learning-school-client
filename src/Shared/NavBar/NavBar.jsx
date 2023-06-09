import { Link } from "react-router-dom"
import useAuth from "../../Hooks/useAuth";
const NavBar = () => {
    const { user, logOut } = useAuth()
    const navInfo = <>
        <li className="text-lg"><Link to="/">Home</Link></li>
        <li className="text-lg"><Link to="/instructors">Instructors</Link></li>
        <li className="text-lg"><Link to="/classes">Classes</Link></li>
        {
            user && <li className="text-lg"><Link to="/dashboard">Dashboard</Link></li>
        }
    </>

    const handleLogOut = () =>{
        logOut()
        .then(()=>{})
        .catch(()=>{})
    }
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
                {
                    user ? <>
                        <button onClick={handleLogOut} className="btn bg-[#84D19F] text-white hover:bg-[#584B9F]">Log out</button>
                        
                        <img title={user.displayName} className="w-14 h-14 rounded-full ml-5" src={user.photoURL} alt="" />

                    </> : <Link to="/login" className="btn bg-[#84D19F] text-white hover:bg-[#584B9F]">Log in</Link>
                }
            </div>
        </div>
    );
};

export default NavBar;