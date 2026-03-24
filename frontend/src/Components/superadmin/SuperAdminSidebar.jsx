import { useNavigate } from "react-router-dom";
import { ChartColumn, UserPen, MailCheck, Columns4, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useDispatch } from "react-redux";
import { SignOutUser } from "@/Store/UserSlice";

const Superadminoptions = [
  { name: "analytics", label: "Analytics", path: "/superadmin/analytics", icon: <ChartColumn /> },
  { name: "admincreate", label: "Admin Creation", path: "/superadmin/admincreate", icon: <UserPen /> },
  { name: "contactus", label: "Contact us", path: "/superadmin/contactus", icon: <MailCheck /> },
  { name: "policycreation", label: "Policy Creation", path: "/superadmin/policycreation", icon: <Columns4 /> },
   { name: "sociallinks", label: "Social Media Links", path: "/superadmin/sociallinks", icon: <Columns4 /> },
];

const SidebarItems = ({ navigate }) => (
  <>
    {Superadminoptions.map((item) => (
      <div
        key={item.name}
        onClick={() => navigate(item.path)}
        className="flex items-center gap-3 text-white p-3 rounded-md cursor-pointer hover:bg-red-600 transition"
      >
        <span className="w-5 h-5">{item.icon}</span>
        <span>{item.label}</span>
      </div>
    ))}
  </>
);

export const SuperAdminSidebar = ({ open, setopen }) => {
  const navigate = useNavigate();
  const dispatch =useDispatch();

  function handleLogout() {
   dispatch(SignOutUser())
  }

  return (
    <div>
      {/* Desktop Sidebar */}
     <div className="hidden md:flex flex-col bg-red-900 w-64 h-screen p-4">
        <SidebarItems navigate={navigate} />

        
      </div>

      {/* Mobile Sheet */}
      <Sheet open={open} onOpenChange={setopen}>
        <SheetContent side="left" className="flex flex-col text-white bg-red-900 w-60 min-h-screen p-4">
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
              className="flex items-center gap-3 text-white p-3 rounded-md cursor-pointer hover:bg-red-600 transition"
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