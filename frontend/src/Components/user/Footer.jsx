import { Facebook, Instagram } from "lucide-react";
import { useNavigate } from "react-router-dom";
import log from "../../assets/log.png";
import { useSelector } from "react-redux";

export const UserFooter = () => {
  const navigate = useNavigate();
  const { socialLinks } = useSelector((state) => state.Social);

  return (
    <footer className="bg-red-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col justify-between gap-4">

        {/* Top Section: Logo + Links */}
        <div className="flex flex-col md:flex-row md:justify-between gap-6">

          {/* Left Side: Logo + Links */}
          <div className="flex flex-col gap-4">
            {/* Logo */}
            <img src={log} alt="Logo" className="w-28 h-auto" />

            {/* Navigation Links */}
            <div className="flex flex-col gap-1 text-lg font-light">
              <button onClick={() => navigate("/user/home")} className="hover:underline text-left">
                Home
              </button>
              <button onClick={() => navigate("/user/listing")} className="hover:underline text-left">
                All Accounts
              </button>
              <button onClick={() => navigate("/user/contacts")} className="hover:underline text-left">
                Contact
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Section: Social Icons */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <p className="text-md font-semibold">Follow Us</p>
          <div className="flex gap-4">
            {/* TikTok */}
            <a
              href={socialLinks?.tiktok || "#"}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-1 hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-5 h-5 fill-current"
              >
                <path d="M448,209.5c-15.5,6.9-32.1,11.6-49,14.1V129.1h-61.2v166.1c0,43.1-35,78-78,78-29.2,0-54.6-16.7-67.4-41.3
                c-3.5-6-6.4-12.3-8.6-18.9c-0.5-1.6-0.9-3.1-1.4-4.7c-0.1-0.3-0.1-0.5-0.2-0.8c-0.2-1.2-0.4-2.4-0.5-3.6
                c-0.3-2.7-0.4-5.4-0.4-8.2c0-38.2,31-69.2,69.2-69.2c20.2,0,38.5,9.3,50.5,24v-82.6h61.2c-5.8,50.4,33.2,97.8,83.6,107.2
                V209.5z"/>
              </svg>
              <span className="text-xs">TikTok</span>
            </a>

            {/* Instagram */}
            <a
              href={socialLinks?.instagram || "#"}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-1 hover:text-gray-200"
            >
              <Instagram size={20} />
              <span className="text-xs">Instagram</span>
            </a>

            {/* Facebook */}
            <a
              href={socialLinks?.facebook || "#"}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-1 hover:text-gray-200"
            >
              <Facebook size={20} />
              <span className="text-xs">Facebook</span>
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom Text */}
      <div className="text-center text-xs text-white/80 py-2 border-t border-red-700 mt-4">
        &copy; {new Date().getFullYear()} ExoticStore. All rights reserved.
      </div>
    </footer>
  );
};