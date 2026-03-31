import { fetchSoldProducts } from "@/Store/SelllerSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SoldProductTile } from "./SoldProductTile";
import { Separator } from "@/Components/ui/separator";
import { useNavigate } from "react-router-dom";

export const SoldProductView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ SAFE: always fallback to empty array
  const { soldProduct = [] } = useSelector((state) => state.Product);

  // ================= FETCH DATA =================
  useEffect(() => {
    dispatch(fetchSoldProducts());
  }, [dispatch]);

  // ================= DEBUG =================
  console.log("soldProduct:", soldProduct);

  return (
    <div>

      {/* TITLE */}
      <h1 className="flex justify-center items-center text-red-900 font-semibold text-2xl md:text-3xl mt-6 mb-4">
        <span className="px-4 z-10">Sold Accounts</span>
      </h1>

      <Separator className="bg-black px-4" />

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">

        {/* ✅ SAFE CHECK BEFORE MAP */}
        {Array.isArray(soldProduct) && soldProduct.length > 0 ? (
          soldProduct.map((Product) => (
            <SoldProductTile key={Product._id} Product={Product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No sold products found
          </p>
        )}

      </div>
    </div>
  );
};