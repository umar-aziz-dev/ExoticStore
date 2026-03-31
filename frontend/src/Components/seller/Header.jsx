import { SignOutUser } from "@/Store/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import log from "../../assets/log.png";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

export const SellerHeader = ({ setopen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [scrolled, setScrolled] = useState(false);

  function onLogout() {
    dispatch(SignOutUser());
  }

  function handleOpen() {
    setopen(true);
  }

  // ✅ Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 overflow-x-hidden
      ${
        scrolled
          ? "bg-white/70 backdrop-blur-lg shadow-sm border-b border-gray-200"
          : "bg-white shadow-sm"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto w-full flex items-center justify-between 
        px-4 md:px-6 transition-all duration-300
        ${scrolled ? "py-1" : "py-2"}`}
      >
        {/* Logo */}
        <div
          className="cursor-pointer hover:opacity-90 transition flex-shrink-0"
          onClick={() => navigate("/superadmin/analytics")}
        >
          <img
            src={log}
            alt="ExoticStore Logo"
            className={`w-auto object-contain transition-all duration-300
            ${scrolled ? "h-8" : "h-10 md:h-11"}`}
          />
        </div>

        {/* Mobile Menu Icon */}
        <div
          onClick={handleOpen}
          className="md:hidden cursor-pointer text-gray-700 hover:text-[#6f2232] transition flex-shrink-0"
        >
          <Menu size={22} />
        </div>

        {/* Desktop Logout Button */}
        <button
          onClick={onLogout}
          className="hidden md:flex items-center justify-center bg-red-900 text-white rounded-full px-4 py-1 text-sm hover:bg-[#6f2232] transition flex-shrink-0"
        >
          Logout
        </button>
      </div>
    </header>
  );
};