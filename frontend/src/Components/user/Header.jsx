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
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import log from "../../assets/log.png";

export const UserHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(SignOutUser());
    setOpen(false);
  }

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300
      ${
        scrolled
          ? "bg-white/70 backdrop-blur-lg shadow-sm border-b border-gray-200"
          : "bg-white shadow-sm"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-6 transition-all duration-300
        ${scrolled ? "py-1" : "py-2"}`}
      >
        {/* Logo */}
        <div
          className="cursor-pointer hover:opacity-90 transition"
          onClick={() => navigate("/")}
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
          onClick={() => setOpen(true)}
          className="md:hidden cursor-pointer"
        >
          <Menu size={22} />
        </div>

        {/* Mobile Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent className="bg-white w-64" side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col mt-6 gap-5">
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

            {/* ✅ Mobile Auth Button */}
            <div className="mt-6">
              {isAuthenticated ? (
                <Button
                  onClick={handleLogout}
                  className="w-full bg-red-900 text-white rounded-full"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    navigate("/auth/signin");
                    setOpen(false);
                  }}
                  className="w-full bg-red-900 text-white rounded-full"
                >
                  SignIn
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5">
          {NavbarIcons.map((items) => (
            <p
              key={items.name}
              onClick={() => navigate(items.path)}
              className="text-gray-700 text-sm font-medium cursor-pointer hover:text-[#6f2232] transition"
            >
              {items.label}
            </p>
          ))}
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated && (
            <Button
              onClick={() => navigate("/auth/signin")}
              className="bg-red-900 text-white rounded-full px-4 py-1 text-sm"
            >
              SignIn
            </Button>
          )}

          <ShoppingCart
            size={20}
            onClick={() => navigate("/shoppingView/cart")}
            className="cursor-pointer text-gray-700 hover:text-[#6f2232] transition"
          />

          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <User
                  size={20}
                  className="cursor-pointer text-gray-700 hover:text-[#6f2232] transition"
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate("/account")}
                >
                  Account
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate("/contact")}
                >
                  Contacts
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};