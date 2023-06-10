import { Outlet } from "react-router-dom"
import ActiveLink from "./ActiveLink/ActiveLink";


const Dashboard = () => {
    const isAdmin = false;
    const isInstructor = false;
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
                    {
                        isAdmin ? <>
                        <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><ActiveLink to="/dashboard/adminhome">Admin Home</ActiveLink></li>
                        <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><ActiveLink to="/dashboard/manageclasses">Manage Classes</ActiveLink></li>
                        <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><ActiveLink to="/dashboard/manageusers">Manage Users</ActiveLink></li>
                    </>
                        :
                        isInstructor ? <>
                            <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><ActiveLink to="/dashboard/instructorhome">Instructor Home</ActiveLink></li>
                            <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><ActiveLink to="/dashboard/addclass">Add A Class</ActiveLink></li>
                            <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><ActiveLink to="/dashboard/classlist">My Classes</ActiveLink></li>
                        </>
                            : <>
                                <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><ActiveLink to="/dashboard/studenthome">Student Home</ActiveLink></li>
                                <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><ActiveLink to="/dashboard/myclasses">My Selected Classes</ActiveLink></li>
                                <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><ActiveLink to="/dashboard/enrollclasses">My Enrolled Class</ActiveLink></li>
                                <li className="rounded-lg text-lg hover:text[#584B9F] mb-3"><ActiveLink to="/dashboard/paymenthistory">Payment History</ActiveLink></li>
                            </>

                    }
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;