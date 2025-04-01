import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      className="h-screen max-h-dvh bg-cover bg-center flex md:items-center justify-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/buzzer-table-with-red-background_23-2149943719.jpg?t=st=1743504411~exp=1743508011~hmac=f0c6fad3d968825b470ebd9ec6fbc255ae4f47bd41ae459dfbaa90009fca9b63&w=996')`,
      }}
    >
      <div className="text-center relative z-10 md:mt-0 mt-20 md:me-20 me-0">
        <h1 className="text-9xl font-extrabold text-white animate-pulse">
          404
        </h1>
        <p className="text-2xl text-white mt-4">Oops! Page not found</p>
        <p className="text-lg text-white mt-2">
          The page you are looking for does not exist.
        </p>
        <div className="mt-6">
          <button
            onClick={() =>
              navigate("/")(localStorage.setItem("LastVisitedPath", ""))
            }
            className="px-8 py-3 text-lg font-semibold text-white bg-black rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
