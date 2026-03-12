import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signin } from "./Pages/Auth/Signin"
import { SignUp } from "./Pages/Auth/SignUp"
import { UserLayout } from "./Components/user/Layout"
import { UserHome } from "./Pages/User/Home"
import { UserAccount } from "./Pages/User/Account"
import { UserReview } from "./Pages/User/Review"
import { UserListing } from "./Pages/User/Listing"
import { UserCheckOut } from "./Pages/User/CheckOut"
import { UserDescription } from "./Pages/User/ProductDescription"
import { SellerLayout } from "./Components/seller/Layout"
import { SellerDashboard } from "./Pages/Seller/Dashboard"
import { SellerProduct } from "./Pages/Seller/Product"
import { SellerOrder } from "./Pages/Seller/Order"
import { Auth } from "./Components/Auth/Layout"
import CheckAuth from "./Config/auth"
import { useSelector } from "react-redux"
import {  UserSellAccount } from "./Pages/User/SellAccount"
import { ForgotPassword } from "./Pages/Auth/ForgotPassword"
import { ResetPassword } from "./Pages/Auth/ResetPassword"
import { SuperLayout } from "./Components/superadmin/SuperLayout"
import { AdminCreate } from "./Pages/SuperAdmin/AdminCreate"
import { PolicyCreation } from "./Pages/SuperAdmin/PolicyCreation"
import { CustomerSupport } from "./Pages/SuperAdmin/CustomerSupport"
import { Analytics } from "./Pages/SuperAdmin/Analytics"
import { AddProduct } from "./Pages/Seller/AddProduct"
import { ProductDetails } from "./Pages/Seller/ProductDetails"


function App() {
  const { User, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<CheckAuth User={User} isAuthenticated={isAuthenticated}><Auth /></CheckAuth>}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="resetpassword/:token" element={<ResetPassword />} />
        </Route>
        <Route path="/user" element={<CheckAuth User={User} isAuthenticated={isAuthenticated}><UserLayout /></CheckAuth>}>
          <Route path="home" element={<UserHome />} />
          <Route path="account" element={<UserAccount />} />
          <Route path="review" element={<UserReview />} />
          <Route path="listing" element={<UserListing />} />
          <Route path="sellaccount" element={<UserSellAccount />} />
          <Route path="checkout" element={<UserCheckOut />} />
          <Route path="product/:id" element={<UserDescription />} />
        </Route>
        <Route path="/seller" element={<CheckAuth User={User} isAuthenticated={isAuthenticated}><SellerLayout /></CheckAuth>}>
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="product" element={<SellerProduct />} />
          <Route path="order" element={<SellerOrder />} />
          <Route path="addproduct" element={<AddProduct/>}/>
          <Route path="productdetails/:id" element={<ProductDetails/>}/>
        </Route>
        <Route path="/superadmin" element={<CheckAuth User={User} isAuthenticated={isAuthenticated}><SuperLayout /></CheckAuth>}>
          <Route path="admincreate" element={<AdminCreate />} />
          <Route path="policycreation" element={<PolicyCreation />} />
          <Route path="customersupport" element={<CustomerSupport />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
