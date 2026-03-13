import Commonform from "@/Common/form";
import { SoldForm } from "@/Common/option";
import { fetchProduct, UpdateStatus } from "@/Store/SelllerSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export const SoldProducts = () => {
    const initialState = {
        sold: "",
        buyername: "",
        buyeremail: "",
        buyernumber: "",
        warrentygiven: "",
    };

    const [FormData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const {productList}=useSelector((state)=>state.Product)

    const OnSubmit = (e) => {
        e.preventDefault();
        dispatch(UpdateStatus({formdata:FormData,id})).then((res) => {
            if (res.payload?.success) {
                toast.success(res.message || "Account status updated Successfully")
                navigate("/seller/product")
            }
        }).catch((e) => {
            toast.error(res.message || "Cannot update the status")
        })
    };

    useEffect(()=>{
        dispatch(fetchProduct());
    },[dispatch])

    useEffect(()=>{
        if(productList){
            console.log("list",productList)
        }
    },[productList])


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

            <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border hover:shadow-2xl transition">

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                    Update Product Status
                </h2>

                {/* Form */}
                <Commonform
                    formControls={SoldForm}
                    FormData={FormData}
                    setFormData={setFormData}
                    buttonText={"Update Status"}
                    onSubmit={OnSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                />

            </div>

        </div>
    );
};