import { SignOutUser } from "@/Store/UserSlice"; 
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import log from "../../assets/log.png";

export const SuperHeader = ({ setopen }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function onLogout() {
        dispatch(SignOutUser());
    }

    function handleOpen() {
        setopen(true);
    }

    return (
        <header
            className={`w-full sticky top-0 z-50 transition-all duration-300
            ${
                scrolled
                    ? "bg-white/40 backdrop-blur-lg shadow-sm border-b border-gray-200"
                    : "bg-white shadow-md"
            }`}
        >
            <div className="flex items-center justify-between px-6 py-4">
                
                {/* Logo */}
                <div
                    className="cursor-pointer hover:opacity-90 transition-opacity duration-300"
                    onClick={() => navigate("/superadmin/analytics")}
                >
                    <img 
                        src={log} 
                        alt="Logo" 
                        className="h-10 sm:h-12 md:h-12 lg:h-12 xl:h-16 w-auto object-contain"
                    />
                </div>

                {/* Mobile Menu */}
                <div 
                    onClick={handleOpen} 
                    className="md:hidden cursor-pointer text-black"
                >
                    <Menu size={28} />
                </div>

                {/* Logout */}
                <button
                    onClick={onLogout}
                    className="hidden md:flex text-white bg-red-900 font-semibold px-4 py-2 rounded-full hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};