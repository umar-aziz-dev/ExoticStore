import { Outlet } from "react-router-dom";
import authpage from "../../assets/authpage.png";

export const Auth = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <img
          src={authpage}
          alt="Auth Page"
          className="w-full h-64 md:h-full object-cover"
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