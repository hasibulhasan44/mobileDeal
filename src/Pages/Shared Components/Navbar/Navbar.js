import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import logo from "../../../images/navbar-logo.png";
import axios from 'axios';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  useEffect(()=>{
    axios
    .get(`http://localhost:5000/user?email=${user?.email}`)
    .then(function(response){
        setUserData(response.data);
    })
  },[user])
  const [userData, setUserData] = useState(null);

  const menuItems = (
    <ul className="flex flex-col gap-5 rounded-box lg:flex-row h-52 lg:h-16 md:h-16 text-white lg:items-center">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/phones">Phone Brands</Link>
      </li>
      <li>
        <Link to="/blogs">Blogs</Link>
      </li>
      <li>
        {user?.uid && (
          <ul
            tabIndex={0}
            className="menu menu-compact menu-horizontal dropdown-content p-0 pl-4"
          >
            <li tabIndex={0}>
              <Link className="p-0">
                Dashboard
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </Link>
              <ul className="rounded-b-xl bg-slate-700 p-3 z-50">
                {userData?.role === "Seller" && (
                  <>
                    <li>
                      <Link to="/dashboard/listanitem">List An Item</Link>
                    </li>
                    <li>
                      <Link to="/dashboard/mylistings">My Listings</Link>
                    </li>
                    <li>
                      <Link to="/dashboard/mybuyers">My Customers</Link>
                    </li>
                  </>
                )}
                {userData?.role === "Buyer" && (
                  <>
                    <li>
                      <Link to="/dashboard/myorders">My Orders</Link>
                    </li>
                    <li>
                      <Link to="/dashboard/mywishlist">My Wishlist</Link>
                    </li>
                  </>
                )}
                {userData?.role === "Admin" && (
                  <>
                    <li>
                      <Link to="/dashboard/allseller">All Seller</Link>
                    </li>
                    <li>
                      <Link to="/dashboard/allbuyer">All Buyer</Link>
                    </li>
                    <li>
                      <Link to="/dashboard/alluser">All User</Link>
                    </li>
                    <li>
                      <Link to="/dashboard/reportedphones">Reported Items</Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        )}
      </li>
    </ul>
  );

  const handleLogOut = () => {
    logOut()
      .then((res) => {
        console.log(res)
        localStorage.clear();
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <div className="navbar bg-slate-700">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-700 rounded-box w-52 text-white"
            >
              {menuItems}
            </ul>
          </div>
          <Link to="/" className="flex items-center">
            <img
              className="w-20 rounded-full hidden lg:flex"
              src={logo}
              alt=""
            />
            <Link
              to="/"
              className="text-xl text-white hover:bg-slate-600 p-2 rounded-lg"
            >
              Mobile-Deals
            </Link>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          {menuItems}
        </div>
        <div className="navbar-end">
          {user?.uid && user?.photoURL ? (
            <section  className="flex items-center">
                <div className=" tooltip tooltip-left" data-tip={`${userData?.name}`}>
                <img
                  className="w-12 border border-gray-500 mr-3 rounded-full"
                  src={user?.photoURL}
                  alt=""
                ></img>
                </div>
              <Link onClick={handleLogOut} className="btn text-white">
                LogOut
              </Link>
            </section>
          ) : (
            <Link to="/login" className="btn text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
