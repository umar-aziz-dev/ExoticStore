import Commonform from "@/Common/form";
import { ProductForm } from "@/Common/option";
import { Button } from "@/Components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/Components/ui/sheet";
import { useEffect, useState } from "react";
import ProductImageView from "./ProductImageView";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteProduct,
  editProduct,
  fetchProduct,
} from "@/Store/SelllerSlice";
import { ProductTile } from "./ProductTile";
import { toast } from "sonner";

export const SellerProduct = () => {
  const { productList, isloading } = useSelector((state) => state.Product);

  const [isEditId, setisEditId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // ================= FILTER AVAILABLE PRODUCTS =================
  const availableProducts =
    productList?.filter(
      (product) => product.sold === "Available"
    ) || [];

  // ================= DELETE =================
  function handleDelete(productid) {
    dispatch(deleteProduct(productid))
      .then((res) => {
        if (res.payload?.success) {
          toast.success(res.payload.message || "Account deleted");
          dispatch(fetchProduct());
        }
      })
      .catch((e) => {
        toast.error(e.message || "Failed to Delete Product");
      });
  }

  // ================= EDIT =================
  function handleEdit(productid) {
    dispatch(editProduct(productid)); // ✅ FIXED
  }

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>

        {/* ✅ CORRECT COUNT */}
        <p className="text-gray-500">
          {availableProducts.length} Available Products
        </p>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4">
        <Button
          onClick={() => navigate("/seller/addproduct")}
          className="bg-red-900 text-white mb-6 border rounded-full hover:bg-red-800"
        >
          Add New Account
        </Button>

        <Button
          className="bg-red-900 text-white border rounded-full hover:bg-red-800"
          onClick={() => navigate("/seller/soldproductview")}
        >
          View Sold Accounts
        </Button>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">

        {availableProducts.map((product) => (
          <ProductTile
            key={product._id}
            onEdit={handleEdit}
            onDelete={handleDelete}
            Product={product}
          />
        ))}

      </div>
    </div>
  );
};