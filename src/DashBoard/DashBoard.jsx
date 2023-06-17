import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';
import { FaUser, FaSchool, FaBookmark, FaCheckCircle, FaCheck, FaMoneyCheck} from 'react-icons/fa';


const DashBoard = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    return (
        <div>
           <div className="flex bg-gray-200 min-h-screen">
                <nav className="bg-gray-800 text-white w-1/5 p-4">
                    <div className="font-bold text-xl mb-4">My Dashboard</div>
                    <ul className="space-y-2">
                        {isAdmin? <li >
                            <Link to='/Dashboard/AllUsers' className='flex items-center'><FaUser></FaUser> &nbsp;<button> Manage Users</button></Link>
                        </li>: ""}
                        {!isAdmin && isInstructor && <li>
                            <Link to='/Dashboard/AddClass' className='flex items-center'> <FaSchool></FaSchool> &nbsp;<button >Add a Class</button></Link>
                        </li>}
                        { !isAdmin && isInstructor &&<li>
                            <Link to='/Dashboard/MyClass' className='flex items-center'><FaBookmark></FaBookmark> &nbsp;<button >My Classes</button></Link>
                        </li>}
                        {isAdmin?<li>
                            <Link to='/Dashboard/ManageClass' className='flex items-center'> <FaSchool></FaSchool>&nbsp;<button >Manage Classes</button></Link>
                        </li>:""}
                        {!isAdmin && !isInstructor &&<li>
                            <Link to='/Dashboard/MySelectedClass' className='flex items-center'><FaCheck></FaCheck> &nbsp;<button >My Selected Classes</button></Link>
                        </li>}
                        {!isAdmin && !isInstructor &&<li>
                            <Link to='/Dashboard/MyEnrolledClass' className='flex items-center'> <FaCheckCircle></FaCheckCircle> &nbsp;<button >My Enrolled Classes</button></Link>
                        </li>}
                       { !isAdmin && !isInstructor &&<li>
                            <Link to='/Dashboard/PaymentHistory' className='flex items-center'> <FaMoneyCheck></FaMoneyCheck> &nbsp; <button >My Payment History</button></Link>
                        </li>}
                    </ul>

                </nav>
                <div className="w-4/5 bg-slate-700 p-4">
                    <h1 className="text-2xl font-bold mb-4 text-center text-slate-300">Welcome to My Dashboard</h1>
                    <div className="bg-slate-700 rounded shadow text-slate-300">
                    <Outlet></Outlet>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashBoard;