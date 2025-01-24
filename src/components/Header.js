import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdownn";

const Header = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard')
  },[])
  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-lg font-bold" onClick={() => navigate("/")}>
        Crypto Dashboard
      </h1>
      <Dropdown />
      <nav>
        <NavLink to="/dashboard" className="px-4">
          Dashboard
        </NavLink>
        <NavLink to="/overview" className="px-4">
          Overview
        </NavLink>
        <NavLink to="/history" className="px-4">
          History
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
