import { Button } from "@/Components/ui/button";
import Banner from "../../assets/Banner.jpeg";
import { ArrowRight, ShieldCheck, Zap, Crown, BadgeDollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ProductTile } from "./ProductTile";
import { useEffect } from "react";
import { fetchAllProduct } from "@/Store/UserProductSlice";

export const UserHome = () => {
  const navigate = useNavigate();
  const { productList, isloading } = useSelector((state) => state.UserProduct);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAllProduct())
  },[dispatch])
  const featuredProducts = [...productList]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);
  return (
    <div>
      {/* Banner */}
      <div className="w-full h-[260px] sm:h-[320px] md:h-[420px] lg:h-[490px] flex justify-center">
        <img
          src={Banner}
          alt="Banner"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Heading */}
      <div className="flex justify-center items-center gap-3 mt-6 text-center flex-wrap">
        <p className="text-2xl md:text-4xl font-bold">
          Elite PUBG Accounts for
        </p>
        <p className="text-red-600 text-2xl md:text-4xl font-extrabold">
          Elite Players
        </p>
      </div>

      {/* Description */}
      <div className="flex flex-col items-center">
        <p className="p-4 text-center max-w-xl">
          The most trusted marketplace for premium PUBG accounts. Safe, secure,
          and instant delivery.
        </p>

        {/* Button */}
        <Button
          onClick={() => navigate("/listing")}
          className="bg-red-600 text-white w-fit px-6 flex items-center gap-2 hover:bg-red-700">
          View Accounts
          <ArrowRight size={18} />
        </Button>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 px-6 max-w-7xl mx-auto">

        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <ShieldCheck className="mx-auto text-red-600 mb-3" size={32} />
          <h3 className="font-bold text-lg">Secure Transactions</h3>
          <p className="text-gray-600 text-sm mt-2">
            Protected payments and account verification
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <Zap className="mx-auto text-red-600 mb-3" size={32} />
          <h3 className="font-bold text-lg">Instant Delivery</h3>
          <p className="text-gray-600 text-sm mt-2">
            Get your account details immediately
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <Crown className="mx-auto text-red-600 mb-3" size={32} />
          <h3 className="font-bold text-lg">Premium Accounts</h3>
          <p className="text-gray-600 text-sm mt-2">
            High-tier accounts with rare items
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
          <BadgeDollarSign className="mx-auto text-red-600 mb-3" size={32} />
          <h3 className="font-bold text-lg">Best Prices</h3>
          <p className="text-gray-600 text-sm mt-2">
            Competitive pricing and great deals
          </p>
        </div>

      </div>
      <div className="bg-red-900 text-white rounded mt-12 py-6">
        <p className="text-2xl md:text-4xl font-bold p-6 mb-6">
          Featured Accounts
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6">
          {featuredProducts.map((Product) => (
            <ProductTile key={Product._id} Product={Product} />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={() => navigate("/user/listing")}
            className="bg-white text-red-600 hover:bg-gray-100"
          >
            View All Accounts
          </Button>
        </div>

      </div>
      {/* Upcoming Features Section */}
      <div className="mt-12 p-6 max-w-7xl mx-auto">
        <p className="text-2xl py-6 mb-8 md:text-4xl font-bold text-red-600 ">
          Upcoming Features
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1: UC Buying */}
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
            <Zap className="mx-auto text-red-600 mb-3" size={32} />
            <h3 className="font-bold text-lg">UC Buying</h3>
            <p className="text-gray-600 text-sm mt-2">
              Buy UC directly through the platform safely and instantly.
            </p>
          </div>

          {/* Card 2: Stripe Payments */}
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
            <BadgeDollarSign className="mx-auto text-red-600 mb-3" size={32} />
            <h3 className="font-bold text-lg">Stripe Payments</h3>
            <p className="text-gray-600 text-sm mt-2">
              Secure online payments with Stripe integration.
            </p>
          </div>

          {/* Card 3: Instant Account Activation */}
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
            <Crown className="mx-auto text-red-600 mb-3" size={32} />
            <h3 className="font-bold text-lg">Sell Your Account</h3>
            <p className="text-gray-600 text-sm mt-2">
             Sell your Account at Best prices as Compared to Market.
            </p>
          </div>

          {/* Card 4: Customer Support */}
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
            <ShieldCheck className="mx-auto text-red-600 mb-3" size={32} />
            <h3 className="font-bold text-lg">24/7 Customer Support</h3>
            <p className="text-gray-600 text-sm mt-2">
              Our team is ready to help you anytime.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};