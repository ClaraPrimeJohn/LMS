import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  TbLayoutSidebarRightExpandFilled,
  TbLayoutSidebarLeftExpandFilled,
  TbSettings,
} from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { LuBookDown } from "react-icons/lu";
import Profile from "../assets/profile.jpg";
import { handleLogout } from "./Logout";

const SidebarSuperAdmin = () => {
  const [isOpen, setisOpen] = useState(true);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <div>
      {!isOpen ? (

        //Maliit na sidebar
        <div className="relative top-0 left-0 h-full w-20 bg-maroon z-50 transition-sidebar rounded-r-xl">
          <ul className="flex flex-col h-full gap-2">
            <li
              className="text-3xl text-center px-4 py-3 m-2 text-white hover:text-blue hover:rounded-xl cursor-pointer"
              onClick={() => setisOpen(true)}
            >
              <TbLayoutSidebarLeftExpandFilled />
            </li>

            <hr className="m-2 text-white text-opacity-50" />

            <Link to="/home-super-admin">
              <li className={`text-3xl text-center px-4 py-3 m-2 text-white ${isActive("/home-super-admin") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <MdDashboard />
              </li>
            </Link>

            <Link to="/books-list">
              <li className={`text-3xl text-center px-4 py-3 m-2 text-white ${isActive("/books-list") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <GiBookshelf />
              </li>
            </Link>

            <Link to="/manage-users">
              <li className={`text-3xl text-center px-4 py-3 m-2 text-white ${isActive("/manage-users") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <TbSettings />
              </li>
            </Link>

            <Link to="/books-issued">
              <li className={`text-3xl text-center px-4 py-3 m-2 text-white ${isActive("/books-issued") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <LuBookDown />
              </li>
            </Link>

            <div className="mt-auto">
              <hr className="m-2 text-white text-opacity-50" />
              <li className="text-3xl text-center px-4 py-3 m-2 text-white hover:bg-white hover:text-black hover:rounded-xl cursor-pointer" onClick={handleLogout}>
                <IoIosLogOut />
              </li>
            </div>
          </ul>
        </div>

      ) : (

        // Malaking sidebar
        <div className="relative top-0 left-0 h-full bg-maroon w-72 rounded-r-xl transition-sidebar">
          <ul className="flex flex-col min-h-screen gap-2">
            <div className="flex items-center m-2 p-2">
              <img
                src={Profile}
                alt="cooler"
                width="48"
                height="48"
                class="rounded-full"
              />

              <div className="ml-3">
                <h1 className="text-base font-semibold text-white">
                  Administrator
                  <span className="block text-sm text-gray font-normal">
                    Super Admin
                  </span>
                </h1>
              </div>

              <div className="text-3xl ml-auto text-white mb-2 hover:text-blue cursor-pointer" onClick={() => setisOpen(!isOpen)}>
                <TbLayoutSidebarRightExpandFilled />
              </div>
            </div>

            <hr className="m-2 text-gray text-opacity-50" />

            <Link to="/home-super-admin">
              <li className={`text-white text-base flex items-center px-4 py-3 m-2 ${isActive("/home-super-admin") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <MdDashboard className="text-3xl mr-2" />
                Dashboard
              </li>
            </Link>

            <Link to="/books-list">
              <li className={`text-white text-base flex items-center px-4 py-3 m-2 ${isActive("/books-list") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <GiBookshelf className="text-3xl mr-2" />
                Book Lists
              </li>
            </Link>

            <Link to="/manage-users">
              <li className={`text-white text-base flex items-center px-4 py-3 m-2 ${isActive("/manage-users") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <TbSettings className="text-3xl mr-2" />
                User Lists
              </li>
            </Link>

            <Link to="/books-issued">
              <li className={`text-white text-base flex items-center px-4 py-3 m-2 ${isActive("/books-issued") ? "bg-blue rounded-xl" : ""} hover:bg-white hover:text-black hover:rounded-xl cursor-pointer`}>
                <LuBookDown className="text-3xl mr-2" />
                Book Issued
              </li>
            </Link>

            <div className="mt-auto">
              <hr className="m-2 text-gray text-opacity-50" />
              <li className="text-white text-base flex items-center px-4 py-3 m-2 hover:bg-white hover:text-black hover:rounded-xl cursor-pointer" onClick={handleLogout}>
                <IoIosLogOut className="text-3xl mr-2" /> Log Out
              </li>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarSuperAdmin;