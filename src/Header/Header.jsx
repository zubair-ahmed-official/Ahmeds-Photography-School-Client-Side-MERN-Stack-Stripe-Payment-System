import React, { useState } from 'react';

import { useContext } from "react";
import { Link } from "react-router-dom";
// import useAdmin from '../hooks/useAdmin';
import { AuthContext } from '../Providers/AuthProvider';
import ThemeToggle from '../Home/ThemeToggle';
import './Header.css'

const Header = () => {
    // const [isAdmin] = useAdmin();
    // const [orderedWatches] = useOrders();
    const { user, logOut } = useContext(AuthContext);
    const handleLogout = () => {
        logOut()
            .then()
            .catch(err => console.error(err))
    }
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        // <div className="navbar bg-slate-400 z-50 navStyle " >
        //     <div className="flex-1 ms-5">
        //         <img height="36px" width="45px" src="https://i.ibb.co/hcygSCQ/423-4236395-clipart-camera-photo-session-camera-photography-logo-png.png"></img>
        //         <a className="btn btn-ghost normal-case text-xl font-bold text-slate-800" href="/">Ahmed's Photography School</a>
        //     </div>

        //     <div className=" pe-5">
        //         <div className='flex items-center gap-4 text-slate-900 font-semibold'>
        //             <Link to='/'><ThemeToggle /></Link>
        //             <Link to='/'>Home</Link>
        //             <Link to='/Instructors'>Instructors</Link>
        //             <Link to='/AllClasses'>Classes</Link>
        //             {user ? <><Link to='/Dashboard'>Dashboard</Link>
        //                 &nbsp; &nbsp;
        //                 <span className='font-bold'>{user.displayName}</span>
        //                 <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        //                     <div className="w-10 rounded-full">
        //                         <img src={user.photoURL && user.photoURL || !user.photoURL && "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"} />
        //                     </div>
        //                 </label>

        //                 <button className="btn btn-error btn-sm font-bold" onClick={handleLogout}>Logout</button>
        //             </> : <Link to='/Login'><button className="btn btn-primary btn-sm font-bold me-5">Login</button></Link>}

        //         </div>
        //     </div>
        // </div>
        <div className="bg-slate-400">
      <div className="px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              className='imgSize'
              src="https://i.ibb.co/hcygSCQ/423-4236395-clipart-camera-photo-session-camera-photography-logo-png.png"
              alt="Logo"
            />
            <a className=" text-base md:text-xl btn btn-ghost normal-case font-bold text-slate-800 " href="/">
              Ahmed's Photography School
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-900 font-semibold">
          <div className=" pe-5">
               <div className='flex items-center gap-4 text-slate-900 font-semibold'>
                <ThemeToggle />
                 <Link to='/'>Home</Link>
                   <Link to='/Instructors'>Instructors</Link>
                   <Link to='/AllClasses'>Classes</Link>
                   {user ? <><Link to='/Dashboard'>Dashboard</Link>
                       &nbsp; &nbsp;
                         <span className='font-bold'>{user.displayName}</span>
                         <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                             <div className="w-10 rounded-full">
                                 <img src={user.photoURL && user.photoURL || !user.photoURL && "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"} />
                             </div>
                         </label>

                         <button className="btn btn-error btn-sm font-bold" onClick={handleLogout}>Logout</button>
                     </> : <Link to='/Login'><button className="btn btn-primary btn-sm font-bold me-5">Login</button></Link>}

                 </div>
             </div>
          </div>

          <button
            className="md:hidden btn btn-ghost btn-circle avatar"
            onClick={handleToggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-200">
          <div className=" px-4 py-2">
          <div className="block mt-3 pb-3 font-bold flex items-center text-right">
            <div style={{marginLeft:"190px"}}><img className='w-10 rounded-full' src={user?.photoURL && user?.photoURL || !user?.photoURL && "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"} /></div>
          &nbsp;<div className='text-right'>{user?.displayName}</div></div>
          <Link to='/' className='text-right'><ThemeToggle /></Link>
            <Link
              to="/"
              className="block py-2 px-2 text-slate-900 hover:text-slate-800 font-semibold text-right"
            >
              Home
            </Link>
            <Link
              to="/Instructors"
              className="block py-2 px-2 text-slate-900 hover:text-slate-800 font-semibold text-right"
            >
              Instructors
            </Link>
            <Link
              to="/AllClasses"
              className="block py-2 px-2 text-slate-900 hover:text-slate-800 font-semibold text-right"
            >
              Classes
            </Link>
            {user ? (
              <>
                <Link
                  to="/Dashboard"
                  className="block py-2 px-2 text-slate-900 hover:text-slate-800 font-semibold text-right"
                >
                  Dashboard 
                </Link>
               
                <button
                  className="btn btn-error btn-sm font-bold"
                  style={{marginLeft: '260px'}}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/Login">
                <button className="btn btn-primary btn-sm font-bold text-right">Login</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
    
    );
};

export default Header;