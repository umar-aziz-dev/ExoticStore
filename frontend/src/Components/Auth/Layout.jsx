import { Outlet } from "react-router-dom";
import authpageMobile from "../../assets/authpage.jpeg";
import authpageDesktop from "../../assets/authpage.png";

export const Auth = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      {/* Image Section */}
      <div className="w-full md:w-1/2">

        {/* Mobile Image */}
        <img
          src={authpageMobile}
          alt="Auth Mobile"
          className="w-full h-64 md:hidden object-cover"
        />

        {/* Desktop & Tablet Image */}
        <img
          src={authpageDesktop}
          alt="Auth Desktop"
          className="hidden md:block w-full h-full object-cover"
        />

      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

    </div>
  );
};