import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signin } from "./Pages/Auth/Signin"
import { SignUp } from "./Pages/Auth/SignUp"

import { UserLayout } from "./Components/user/Layout"
import { SellerLayout } from "./Components/seller/Layout"
import { SuperLayout } from "./Components/superadmin/SuperLayout"
import { Auth } from "./Components/Auth/Layout"

import { UserHome } from "./Pages/User/Home"
import UserAccount from "./Pages/User/Account"
import { UserReview } from "./Pages/User/Review"
import { UserListing } from "./Pages/User/Listing"
import { UserDescription } from "./Pages/User/ProductDescription"

import { SellerDashboard } from "./Pages/Seller/Dashboard"
import { SellerProduct } from "./Pages/Seller/Product"
import { SellerOrder } from "./Pages/Seller/Order"
import { AddProduct } from "./Pages/Seller/AddProduct"
import { ProductDetails } from "./Pages/Seller/ProductDetails"
import { SoldProducts } from "./Pages/Seller/SoldProducts"
import { SoldProductView } from "./Pages/Seller/SoldProductView"
import { SoldProductDetails } from "./Pages/Seller/SoldProductDetails"

import { AdminCreate } from "./Pages/SuperAdmin/AdminCreate"
import { PolicyCreation } from "./Pages/SuperAdmin/PolicyCreation"
import { Contactus } from "./Pages/SuperAdmin/Contactus"
import { Analytics } from "./Pages/SuperAdmin/Analytics"
import { SocialLinks } from "./Pages/SuperAdmin/SocialLinks"

import CheckAuth from "./Config/auth"
import { useSelector } from "react-redux"
import { UserContacts } from "./Pages/User/Contacts"
import { UserSellAccount } from "./Pages/User/SellAccount"
import UserPolicy from "./Pages/User/Policy"

function App() {
  const { User, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>

        {/* ================= USER ================= */}
        <Route
          path="/"
          element={
            <CheckAuth User={User} isAuthenticated={isAuthenticated}>
              <UserLayout />
            </CheckAuth>
          }
        >
          <Route index element={<UserHome />} />
          <Route path="listing" element={<UserListing />} />
          <Route path="account" element={<UserAccount />} />
          <Route path="review" element={<UserReview />} />
          <Route path="contact" element={<UserContacts />} />
          <Route path="sellaccount" element={<UserSellAccount />} />
          <Route path="product/:id" element={<UserDescription />} />
          <Route path="policy" element={<UserPolicy />} />
        </Route>

        {/* ================= SELLER ================= */}
        <Route
          path="/seller"
          element={
            <CheckAuth User={User} isAuthenticated={isAuthenticated}>
              <SellerLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="product" element={<SellerProduct />} />
          <Route path="order" element={<SellerOrder />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="productdetails/:id" element={<ProductDetails />} />
          <Route path="soldproducts/:id" element={<SoldProducts />} />
          <Route path="soldproductview" element={<SoldProductView />} />
          <Route path="soldproductdetails/:id" element={<SoldProductDetails />} />
        </Route>

        {/* ================= SUPER ADMIN ================= */}
        <Route
          path="/superadmin"
          element={
            <CheckAuth User={User} isAuthenticated={isAuthenticated}>
              <SuperLayout />
            </CheckAuth>
          }
        >
          <Route path="admincreate" element={<AdminCreate />} />
          <Route path="policycreation" element={<PolicyCreation />} />
          <Route path="contactus" element={<Contactus />} />
          <Route path="sociallinks" element={<SocialLinks />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* ================= AUTH ================= */}
        <Route
          path="/auth"
          element={
            <CheckAuth User={User} isAuthenticated={isAuthenticated}>
              <Auth />
            </CheckAuth>
          }
        >
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App