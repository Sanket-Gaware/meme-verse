import React from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MainWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("LastVisitedPath", location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    !localStorage.getItem("Token") ? navigate("/") : "";
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 w-full">
      <Sidebar />
      <div className="col-span-9 md:p-1 px-0 py-1 md:pb-2 pb-7">
        <Outlet />
      </div>
    </div>
  );
}
