import Commonform from "@/Common/form";
import { ProductForm } from "@/Common/option";
import { Button } from "@/Components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/Components/ui/sheet";
import { useState } from "react";
import ProductImageView from "./ProductImageView";
import { useSelector } from "react-redux";

export const SellerProduct = () => {

    const initialState = {
        img: "",
        video: "",
        title: "",
        price: "",
        saleprice: "",
        description: "",
        sellername: "",
        sellerwatsapp: "",
    };

    const [open, setopen] = useState(false);
    const [formData, setformData] = useState(initialState);
    const [imageurl, setimageurl] = useState([]);
    const [imageview, setimageview] = useState([]);
    const { productList, isloading } = useSelector((state) => state.Product);
    const [isEditId, setisEditId] = useState(null);

    function handleOpen() {
        setopen(true);
    }

    function OnSubmit(e) {
        e.preventDefault();
        console.log(formData); // for testing
    }

    return (
        <div>

            <div className="flex justify-between p-4 m-4">
                <h1>All Products</h1>
                <p>3 Products</p>
            </div>

            <Button
                onClick={handleOpen}
                className="bg-[#6f2232] text-white"
            >
                Add New Product
            </Button>

            <Sheet open={open} onOpenChange={setopen}>
                <SheetContent className="overflow-y-auto w-80 bg-white">
                    <SheetHeader>
                        <SheetTitle>
                            Add New Product
                        </SheetTitle>
                    </SheetHeader>

                    <ProductImageView
                        setimageurl={setimageurl}
                        setimageview={setimageview}
                        imageview={imageview}
                        isloading={isloading}
                        isEditId={isEditId}
                    />

                    <Commonform
                        formControls={ProductForm}
                        FormData={formData}
                        setFormData={setformData}
                        buttonText={"Add Product"}
                        onSubmit={OnSubmit}
                    />

                </SheetContent>
            </Sheet>

        </div>
    );
};