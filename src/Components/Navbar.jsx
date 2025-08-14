import React from 'react';
import logo from '../assets/logo.png.png';
import { Link, NavLink, useLocation } from 'react-router'; 
import AuthContexts from '../Contexts/AuthContexts';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, signOutUser } = React.useContext(AuthContexts);
  const location = useLocation();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success('Logged out successfully!');
      })
      .catch((error) => {
        toast.error('Failed to log out. Please try again.');
      });
  };

  const activeLinkClass = "relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:rounded-full text-blue-600 font-semibold";

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="sticky top-0 z-50 bg-base-100 shadow-md backdrop-blur-md"
    >
      <div className="navbar w-11/12 mx-auto">
        {/* START */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg backdrop-blur-sm"
            >
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass : ""}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/lost-found-items" className={({ isActive }) => isActive ? activeLinkClass : ""}>
                  Lost & Found Items
                </NavLink>
              </li>
            </ul>
          </div>
          <img className='w-12 h-12 object-contain' src={logo} alt="logo" />
          <a className="btn btn-ghost text-xl bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent font-extrabold">Lost & Found</a>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg font-medium gap-4">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass : ""}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/lost-found-items" className={({ isActive }) => isActive ? activeLinkClass : ""}>
                Lost & Found Items
              </NavLink>
            </li>
          </ul>
        </div>

        {/* END */}
        <div className="navbar-end gap-3">
          {user ? (
            <>
              <div className="dropdown dropdown-end tooltip tooltip-left" data-tip={user.displayName || user.email}>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <motion.div whileHover={{ scale: 1.1 }} className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        user?.photoURL && user.photoURL.trim() !== ""
                          ? user.photoURL
                          : "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                      }
                      alt="profile"
                    />
                  </motion.div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <NavLink to="/add-item" className={({ isActive }) => isActive ? activeLinkClass : ""}>Add Lost & Found</NavLink>
                  </li>
                  <li>
                    <NavLink to="/recovered" className={({ isActive }) => isActive ? activeLinkClass : ""}>All Recovered</NavLink>
                  </li>
                  <li>
                    <NavLink to="/manage-items" className={({ isActive }) => isActive ? activeLinkClass : ""}>Manage Items</NavLink>
                  </li>
                </ul>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleSignOut}
                className="btn btn-outline btn-error"
              >
                LogOut
              </motion.button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to="/login"
                className="btn bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl px-6 py-2 shadow-md hover:shadow-xl transition-all duration-300"
              >
                Login
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
