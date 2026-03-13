import { Button } from "@/Components/ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProductTile = ({ Product, onDelete, onEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group w-full max-w-sm">

      {/* Image Section */}
      <div className="relative h-60 w-full overflow-hidden">

        {/* Sold / Available Badge */}
        {Product.sold && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
            {Product.sold}
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
          <p className="text-lg font-bold text-green-600">
            ${Product.saleprice}
          </p>
          <p className="text-sm text-gray-400 line-through">
            ${Product.price}
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">

          <Button
            onClick={() => navigate(`/seller/productdetails/${Product._id}`)}
            className="w-full"
          >
            View
          </Button>

          <Button
            onClick={() => onDelete(Product._id)}
            variant="destructive"
            className="w-full"
          >
            Delete
          </Button>

          <Button
            onClick={() => navigate("/seller/addproduct", { state: { product: Product } })}
            variant="secondary"
            className="w-full"
          >
            Edit
          </Button>

          <Button
            onClick={() => navigate(`/seller/soldproducts/${Product._id}`)}
            className="w-full bg-yellow-500 hover:bg-yellow-600"
          >
            Sold
          </Button>

        </div>

      </div>
    </div>
  );
};