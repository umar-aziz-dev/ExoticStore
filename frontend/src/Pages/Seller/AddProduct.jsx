import Commonform from "@/Common/form";
import { ProductForm } from "@/Common/option";
import { useEffect, useState } from "react";
import ProductImageView from "./ProductImageView";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { AddProducts, editProduct } from "@/Store/SelllerSlice";
import { useNavigate, useLocation } from "react-router-dom";

export const AddProduct = () => {
  const initialState = {
    userId: "",
    characterid: "",
    img: [],
    video: "",
    title: "",
    price: "",
    saleprice: "",
    description: "",
    purchasedprice: "",
    boughtfrom: "",
    accountemail: "",
    accountnumber: "",
    warrentygot: "",
  };

  const [FormData, setFormData] = useState(initialState);
  const [imageurl, setimageurl] = useState([]);
  const [imageview, setimageview] = useState([]);
  const [loading, setLoading] = useState(false);

  const { productList, isloading } = useSelector((state) => state.Product);
  const { User } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const editProducts = location.state?.product;

  // Populate form if editing
  useEffect(() => {
    if (editProducts) {
      setFormData(editProducts);
      setimageurl(editProducts.img || []);
    }
  }, [editProducts]);

  const OnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editProducts) {
        await dispatch(editProduct({ id: editProducts._id, formdata: FormData }));
        toast.success("Account Edited Successfully");
      } else {
        if (imageurl.length === 0) {
          toast.error("Please upload at least one image.");
          return;
        }
        await dispatch(AddProducts({ ...FormData, userId: User._id, img: imageurl }));
        toast.success("Product Added Successfully");
      }

      // Reset form and navigate
      setFormData(initialState);
      setimageurl([]);
      setimageview([]);
      navigate("/seller/product");
    } catch (error) {
      toast.error(error.message || "Operation Failed");
    } finally {
      setLoading(false);
    }
  };

  // Determine button text
  const getButtonText = () => {
    if (loading) return editProducts ? "Editing..." : "Adding...";
    return editProducts ? "Edit" : "Add Product";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6 space-y-6 hover:shadow-2xl transition-shadow duration-300">

        {/* Page Title */}
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">
          {editProducts ? "Edit Product" : "Add New Product"}
        </h2>

        {/* Image & Video Upload Section */}
        <div className="bg-gray-50 p-4 rounded-xl border">
          <ProductImageView
            setimageurl={setimageurl}
            setimageview={setimageview}
            imageview={imageview}
            isloading={isloading}
            isEditId={editProducts}
          />
        </div>

        {/* Form Section */}
        <div className="bg-gray-50 p-6 rounded-xl border">
          <Commonform
            formControls={ProductForm}
            FormData={FormData}
            setFormData={setFormData}
            buttonText={getButtonText()}
            onSubmit={OnSubmit}
            buttonDisabled={loading || isloading}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          />
        </div>

      </div>
    </div>
  );
};