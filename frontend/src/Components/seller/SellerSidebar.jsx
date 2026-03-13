import { useNavigate } from "react-router-dom";
import { ChartColumn, UserPen, MailCheck, Columns4, LogOut, User } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useDispatch } from "react-redux";
import { SignOutUser } from "@/Store/UserSlice";

const Superadminoptions = [
  { name: "dashboard", label: "Seller Dashboard", path: "/seller/dashboard", icon: <ChartColumn /> },
  { name: "product", label: "Add Account", path: "/seller/product", icon: <User/> },
];

const SidebarItems = ({ navigate }) => (
  <>
    {Superadminoptions.map((item) => (
      <div
        key={item.name}
        onClick={() => navigate(item.path)}
        className="flex items-center gap-3 text-white p-3 rounded-md cursor-pointer hover:bg-[#7f2a42] transition"
      >
        <span className="w-5 h-5">{item.icon}</span>
        <span>{item.label}</span>
      </div>
    ))}
  </>
);

export const SellerSidebar = ({ open, setopen }) => {
  const navigate = useNavigate();
  const dispatch =useDispatch();

  function handleLogout() {
   dispatch(SignOutUser())
  }

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col gap-4 bg-[#6f2232] w-64 h-screen p-4">
        <SidebarItems navigate={navigate} />
      </div>

      {/* Mobile Sheet */}
      <Sheet open={open} onOpenChange={setopen}>
        <SheetContent side="left" className="flex flex-col gap-2 text-white bg-[#6f2232] w-60 min-h-screen p-4">
          <SheetHeader>
            <SheetTitle className="p-4 mt-4">SuperAdmin Panel</SheetTitle>
          </SheetHeader>

          {/* Menu Items */}
          {Superadminoptions.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                navigate(item.path);
                setopen(false);
              }}
              className="flex items-center gap-3 text-white p-3 rounded-md cursor-pointer hover:bg-[#7f2a42] transition"
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}

          {/* Logout Button */}
          <div
            onClick={() => {
              handleLogout();
              setopen(false);
            }}
            className="flex items-center gap-3 text-white p-3 mt-auto rounded-md cursor-pointer hover:bg-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            <span onClick={handleLogout}>Logout</span>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};