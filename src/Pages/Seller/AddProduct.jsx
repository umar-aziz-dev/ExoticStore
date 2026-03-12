import Commonform from "@/Common/form";
import { ProductForm } from "@/Common/option";
import { useEffect, useState } from "react";
import ProductImageView from "./ProductImageView";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { AddProducts } from "@/Store/SelllerSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { editProduct } from "@/Store/SelllerSlice";

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
    const [isEditId, setisEditId] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const editProducts = location.state?.product;

    useEffect(() => {
        if (imageurl) {
            console.log("images", imageurl)
            console.log("user", User)
        }
    }, [imageurl])

    useEffect(() => {
        if (editProducts) {
            console.log("id", editProducts)
            setFormData(editProducts);
          
        }
    }, [editProducts])

    const OnSubmit = async (e) => {
        e.preventDefault();



        setLoading(true);
        if (editProducts) {
            dispatch(editProduct({ id: editProducts._id,formdata: FormData })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.message || "Account Edit Successfully")
                    setFormData(initialState);
                    navigate("/seller/product")
                }
            }).catch((e) => {
                toast.error(e.message || "Cannot Edit Account")
            })
        } else {
            if (imageurl.length === 0) {
                toast.error("Please upload at least one image.");
                return;
            }
            dispatch(AddProducts({ ...FormData, userId: User._id, img: imageurl }))
                .then((res) => {

                    if (res.payload?.success) {

                        toast.success(res.payload.message || "Product Added Successfully");

                        setFormData(initialState);
                        setimageurl([]);
                        setimageview([]);

                        navigate("/seller/product"); // ✅ navigation works
                    }

                })
                .catch((e) => {
                    toast.error(e.message || "Failed to Add Account");
                })
                .finally(() => {
                    setLoading(false);
                });
        }

    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">

            <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6 space-y-6 hover:shadow-2xl transition-shadow duration-300">

                {/* Page Title */}
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">
                    Add New Product
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
                        buttonText={editProduct ? "Edit" : loading ? "Adding..." : "Add Product"}
                        onSubmit={OnSubmit}
                        buttonDisabled={loading}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    />
                </div>

            </div>
        </div>
    );
};