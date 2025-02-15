import {
    Dashboard,
    AddCircleOutline,
    ListAlt,
    PeopleOutline,
    SettingsOutlined,
    AnalyticsOutlined,
    ExitToApp,
    AccountCircleOutlined,
  } from "@mui/icons-material";
  import React from "react";
  import { Link } from "react-router-dom";
  import "./sidebar.scss";
  
  function Sidebar() {
    return (
      <div className="w-64 h-screen bg-gray-900 dark:bg-gray-800 text-gray-200 dark:text-gray-300 flex flex-col p-4 shadow-lg">
        {/* Logo Section */}
        <div className="mb-6">
          <Link to="/" className="text-2xl font-bold text-white dark:text-gray-100 tracking-wide">
            NoticeBoard Admin
          </Link>
        </div>
        <hr className="border-gray-700 dark:border-gray-600 mb-4" />
  
        {/* Menu Section */}
        <div className="flex-1">
          <ul className="space-y-3">
            <p className="text-gray-400 dark:text-gray-500 text-sm uppercase">Main</p>
            <Link to="/dashboard" className="block">
              <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700">
                <Dashboard className="text-lg" />
                <span>Dashboard</span>
              </li>
            </Link>
  
            <p className="text-gray-400 dark:text-gray-500 text-sm uppercase mt-4">Notices</p>
            <Link to="/notices/new" className="block">
              <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700">
                <AddCircleOutline className="text-lg" />
                <span>Create Notice</span>
              </li>
            </Link>
            <Link to="/notices" className="block">
              <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700">
                <ListAlt className="text-lg" />
                <span>Manage Notices</span>
              </li>
            </Link>
  
            <p className="text-gray-400 dark:text-gray-500 text-sm uppercase mt-4">User Management</p>
            <Link to="/users" className="block">
              <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700">
                <PeopleOutline className="text-lg" />
                <span>Users</span>
              </li>
            </Link>
  
            <p className="text-gray-400 dark:text-gray-500 text-sm uppercase mt-4">Reports</p>
            <Link to="/analytics" className="block">
              <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700">
                <AnalyticsOutlined className="text-lg" />
                <span>Notice Analytics</span>
              </li>
            </Link>
  
            <p className="text-gray-400 dark:text-gray-500 text-sm uppercase mt-4">Settings</p>
            <Link to="/settings" className="block">
              <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700">
                <SettingsOutlined className="text-lg" />
                <span>Settings</span>
              </li>
            </Link>
  
            <p className="text-gray-400 dark:text-gray-500 text-sm uppercase mt-4">User</p>
            <Link to="/profile" className="block">
              <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-700">
                <AccountCircleOutlined className="text-lg" />
                <span>Profile</span>
              </li>
            </Link>
            <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-red-600 dark:hover:bg-red-500 cursor-pointer">
              <ExitToApp className="text-lg" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  
  export default Sidebar;
  