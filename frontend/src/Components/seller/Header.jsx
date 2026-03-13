import { SignOutUser } from "@/Store/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import log from "../../assets/log.png"
import { Menu } from "lucide-react";

export const SellerHeader = ({setopen}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onLogout(){
    dispatch(SignOutUser());
  }

  function handleOpen(){
    setopen(true)
  }

  return (
   <header className="flex items-center justify-between px-6 py-4 shadow-lg ">
            {/* Logo Image */}
            <div
                className="cursor-pointer hover:opacity-90 transition-opacity duration-300"
                onClick={() => navigate("/superadmin/analytics")}
            >
                <img 
                    src={log} 
                    alt="ExoticStore Logo" 
                    className="h-10 sm:h-12 md:h-12 lg:h-12 xl:h-16 w-auto object-contain transition-all duration-300"
                />
            </div>

            {/* Mobile Menu Icon */}
            <div 
                onClick={handleOpen} 
                className="md:hidden cursor-pointer text-black hover:opacity-80 transition-opacity duration-300"
            >
                <Menu size={28} />
            </div>

            {/* Logout Button */}
            <button
                onClick={onLogout}
                className="hidden md:flex text-white bg-[#6f2232] font-semibold px-4 py-2 rounded hover:bg-[#7f2a42] hover:opacity-90 transition duration-300"
            >
                Logout
            </button>
        </header>
  );
};