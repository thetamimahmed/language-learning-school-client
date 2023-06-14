import { Outlet, Link } from "react-router-dom"
import useAdmin from "../../Hooks/useAdmin";
import useInstructor from "../../Hooks/useInstructor";
import ActiveLink from "./ActiveLink/ActiveLink";
import { FaHome, FaHistory, FaUsers } from 'react-icons/fa';
import { BiSelectMultiple, BiBookAdd } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";




const Dashboard = () => {

    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()
    console.log(isAdmin, isInstructor)
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    <a className="normal-case text-lg lg:text-2xl font-bold mb-4 text-[#584B9F]">Language <span className="text-[#84D19F]"> Learning</span> <br />School</a>
                    {/* Sidebar content here */}
                    <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><Link to="/"><FaHome></FaHome>Home</Link></li>
                    {
                        isAdmin ? <>
                            <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><ActiveLink to="/dashboard/manageclasses"><SiGoogleclassroom></SiGoogleclassroom> Manage Classes</ActiveLink></li>
                            <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><ActiveLink to="/dashboard/manageusers"><FaUsers></FaUsers> Manage Users</ActiveLink></li>
                        </>
                            :
                            isInstructor ? <>
                                <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><ActiveLink to="/dashboard/addclass"><BiBookAdd></BiBookAdd> Add A Class</ActiveLink></li>
                                <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><ActiveLink to="/dashboard/classlist"><SiGoogleclassroom></SiGoogleclassroom> My Classes</ActiveLink></li>
                            </>
                                : <>
                                    <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><ActiveLink to="/dashboard/myclasses"><BiSelectMultiple></BiSelectMultiple> My Selected Classes</ActiveLink></li>
                                    <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><ActiveLink to="/dashboard/enrollclasses"><SiGoogleclassroom></SiGoogleclassroom> My Enrolled Class</ActiveLink></li>
                                    <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><ActiveLink to="/dashboard/paymenthistory"><FaHistory></FaHistory>Payment History</ActiveLink></li>
                                </>

                    }
                </ul>

            </div>

        </div>
    );
};

export default Dashboard;