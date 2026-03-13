import { fetchSoldProducts } from "@/Store/SelllerSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SoldProductTile } from "./SoldProductTile";
import { Separator } from "@/Components/ui/separator";
import { useNavigate } from "react-router-dom";

export const SoldProductView = () => {
    const { soldProduct } = useSelector((state) => state.Product);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  

    useEffect(() => {
        dispatch(fetchSoldProducts());
    }, [dispatch]);

    return (
        <div>
            <h1 className="flex justify-center p-4 m-4 font-semibold text-xl">
                Sold Accounts
            </h1>

            <Separator className="bg-black mx-4" />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {soldProduct.map((Product) => (
                    <SoldProductTile  key={Product._id} Product={Product} />
                ))}
            </div>
        </div>
    );
};