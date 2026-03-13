import Commonform from "@/Common/form";
import { ProductForm } from "@/Common/option";
import { Button } from "@/Components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/Components/ui/sheet";
import { useEffect, useState } from "react";
import ProductImageView from "./ProductImageView";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct, editProduct, fetchProduct } from "@/Store/SelllerSlice";
import { ProductTile } from "./ProductTile";
import { toast } from "sonner";

export const SellerProduct = () => {


    const { productList, isloading } = useSelector((state) => state.Product);
    const [isEditId, setisEditId] = useState(null);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ✅ Correct useEffect
    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

    function handleDelete(productid) {
        dispatch(deleteProduct(productid)).then((res) => {
            if (res.payload?.success) {
                toast.success(res.message || "Account deleted")
                dispatch(fetchProduct())
            }
        }).catch((e) => {
            toast.error(e.message || "Failed to Delete Product")
        })
    }

    function handleEdit(productid){
        dispatch(editProduct())
    }


    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">All Products</h1>
                <p className="text-gray-500">{productList?.length} Products</p>
            </div>

            {/* Add Product Button */}
            <div>
                <Button
                onClick={() => navigate("/seller/addproduct")}
                className="bg-[#6f2232] text-white mb-6"
            >
                Add New Account
            </Button>
            <Button
            onClick={()=>navigate("/seller/soldproductview")}>
                View Sold Accounts
            </Button>
            </div>

            {/* Product Grid */}
            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {
                    Array.isArray(productList) &&
                    productList
                        .filter((product) => product.sold === "Available")
                        .map((product) => (
                            <ProductTile key={product._id} onEdit={handleEdit} onDelete={handleDelete} Product={product} />
                        ))
                }
            </div>

        </div>
    );
};