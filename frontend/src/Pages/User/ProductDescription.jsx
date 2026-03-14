import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/Components/ui/button";
import { Skeleton } from "@/Components/ui/skeleton";
import { fetchSingleProduct } from "@/Store/UserProductSlice";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/Components/ui/textarea";

export const UserDescription = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleProduct, isloading } = useSelector((state) => state.UserProduct);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleProduct?.img?.length > 0) {
      setSelectedImage(singleProduct.img[0]);
    }
  }, [singleProduct]);

  /* ================= LOADING SKELETON ================= */

  if (isloading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT SIDE Skeleton */}
          <div className="space-y-6">
            <Skeleton className="w-full h-[350px] rounded-xl" />
            <Skeleton className="w-full h-[400px] rounded-xl" />

            <div className="flex gap-3">
              <Skeleton className="w-20 h-20 rounded-lg" />
              <Skeleton className="w-20 h-20 rounded-lg" />
              <Skeleton className="w-20 h-20 rounded-lg" />
              <Skeleton className="w-20 h-20 rounded-lg" />
            </div>
          </div>

          {/* RIGHT SIDE Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-10 w-[300px]" />
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-6 w-[150px]" />

            <div className="space-y-2">
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
            </div>

            <Skeleton className="h-12 w-full rounded-lg" />
          </div>

        </div>
      </div>
    );
  }

  /* ================= PRODUCT PAGE ================= */

  if (!singleProduct) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT SIDE (Video + Images) */}
        <div className="space-y-6">

          {singleProduct.video && (
            <div className="w-full h-[350px] rounded-xl overflow-hidden shadow">
              <iframe
                className="w-full h-full"
                src={singleProduct.video.replace(
                  "youtu.be/",
                  "www.youtube.com/embed/"
                )}
                allowFullScreen
              ></iframe>
            </div>
          )}

          {selectedImage && (
            <div className="w-full h-[400px] rounded-xl overflow-hidden shadow">
              <img
                src={selectedImage}
                alt={singleProduct.title}
                className="w-full h-full object-cover hover:scale-110 transition duration-300"
              />
            </div>
          )}

          <div className="flex gap-3 flex-wrap">
            {singleProduct.img?.map((image, index) => (
              <img
                key={index}
                src={image}
                onClick={() => setSelectedImage(image)}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition
                ${selectedImage === image
                    ? "border-red-500 ring-2 ring-red-400"
                    : "border-gray-300"
                  }`}
              />
            ))}
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-5">

          <h1 className="text-3xl font-bold">
            {singleProduct.title}
          </h1>

          {singleProduct.saleprice && (
            <span className="bg-red-500 text-white px-3 py-1 text-sm rounded-full">
              SALE
            </span>
          )}

          <div className="flex items-center gap-4">
            {singleProduct.saleprice && (
              <p className="text-gray-400 line-through text-lg">
                {singleProduct.price} Pkr
              </p>
            )}

            <p className="text-3xl font-bold text-green-600">
              {singleProduct.saleprice || singleProduct.price} Pkr
            </p>
          </div>

          <p className="text-gray-600">
            <span className="font-semibold">Character ID:</span>{" "}
            {singleProduct.characterid}
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Description
            </h2>

            <div className="border-2 border-red-600 rounded-xl p-4 bg-gray-50">
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                {singleProduct.description}
              </p>
            </div>
          </div>

          <div className="border rounded-xl p-4 space-y-2">

            <p>
              <span className="font-semibold">Seller:</span>{" "}
              {singleProduct.sellername}
            </p>

            <Button
              onClick={() =>
                window.open(
                  `https://wa.me/92${singleProduct.sellerwatsapp.slice(1)}`
                )
              }
              className="w-full bg-red-600 text-white"
            >
              Contact on WhatsApp
            </Button>


          </div>

        </div>

      </div>

    </div>
  );
};