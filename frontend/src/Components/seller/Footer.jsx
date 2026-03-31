import { useNavigate } from "react-router-dom";
import log from "../../assets/log.png";

export const SellerFooter = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-red-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col justify-between gap-4">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between gap-6">

          {/* Left Side: Logo + Links */}
          <div className="flex flex-col gap-4">
            {/* Logo */}
            <img src={log} alt="Logo" className="w-28 h-auto" />

            {/* Seller Navigation */}
            <div className="flex flex-col gap-1 text-lg font-light">
              <button
                onClick={() => navigate("/superadmin/analytics")}
                className="hover:underline text-left"
              >
                Dashboard
              </button>

              <button
                onClick={() => navigate("/seller/product")}
                className="hover:underline text-left"
              >
                Add Account
              </button>
              <button
                onClick={() => navigate("/seller/soldproductview")}
                className="hover:underline text-left"
              >
                View Sold Account
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <p className="text-sm font-semibold">Seller Panel</p>
        </div>

      </div>

      {/* Footer Bottom Text */}
      <div className="text-center text-xs text-white/80 py-2 border-t border-red-700 mt-4">
        &copy; {new Date().getFullYear()} ExoticStore | Seller Portal
      </div>
    </footer>
  );
};