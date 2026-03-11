import { NavbarIconforsm, NavbarIcons } from "@/Common/option";
import { useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { SignOutUser } from "@/Store/UserSlice";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import log from "../../assets/log.png"

export const UserHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(SignOutUser());
    setOpen(false)
  }

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
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
        <div onClick={() => setOpen(true)} className="md:hidden cursor-pointer">
          <Menu />
        </div>

        {/* Mobile Sheet Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent className="bg-white w-64" side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col mt-8 gap-6">
              {NavbarIconforsm.map((items) => (
                <p
                  key={items.name}
                  onClick={() => {
                    navigate(items.path);
                    setOpen(false);
                  }}
                  className="text-gray-700 font-medium cursor-pointer hover:text-[#6f2232] transition"
                >
                  {items.label}
                </p>
              ))}
            </nav>
            <p onClick={handleLogout} className="mt-5 text-gray-700 font-medium cursor-pointer hover:text-[#6f2232] transition">
              Logout
            </p>

          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NavbarIcons.map((items) => (
            <p
              key={items.name}
              onClick={() => navigate(items.path)}
              className="text-gray-700 font-medium cursor-pointer hover:text-[#6f2232] transition"
            >
              {items.label}
            </p>
          ))}
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-5">
          {
            !isAuthenticated && (
              <Button onClick={() => navigate("/auth/signin")} className="bg-[#6f2232] text-white">SignIn</Button>
            )
          }

          <ShoppingCart
            onClick={() => navigate("/shoppingView/cart")}
            className="cursor-pointer text-gray-700 hover:text-[#6f2232] transition"
          />

          {
            isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <User className="cursor-pointer text-gray-700 hover:text-[#6f2232] transition" />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate("/user/account")}
                  >
                    Account
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          }
        </div>

      </div>
    </header>
  );
};