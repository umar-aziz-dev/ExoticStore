import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";

export const ProductTile = ({ Product }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group w-full">

      {/* Image Section */}
      <div className="relative h-60 w-full overflow-hidden">

        {/* SALE Badge */}
        {Product.saleprice && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
            SALE
          </span>
        )}

        {/* First Image */}
        <img
          src={Product.img?.[0]}
          alt={Product.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />

        {/* Second Image (Hover) */}
        {Product.img?.[1] && (
          <img
            src={Product.img[1]}
            alt={Product.title}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {Product.title}
        </h2>

        {/* Price */}
        <div className="flex items-center gap-3">
          

          {Product.saleprice && (
            <p className="text-sm text-gray-400 line-through">
              {Product.price} Pkr
            </p>
          )}
           <p className="text-lg font-bold text-green-600">
            {Product.saleprice || Product.price} Pkr
          </p>
        </div>

        {/* Buttons */}
        <div className="pt-2">
          <Button
            onClick={() => navigate(`/user/product/${Product._id}`)}
            className="w-full bg-red-600 text-white"
          >
            View Details
          </Button>
        </div>

      </div>
    </div>
  );
};