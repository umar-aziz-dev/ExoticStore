import { fetchSingleSoldProduct } from "@/Store/SelllerSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const SoldProductDetails = () => {
    const { singleSoldProduct, isloading } = useSelector((state) => state.Product);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        dispatch(fetchSingleSoldProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (singleSoldProduct?.img?.length) {
            setActiveImage(singleSoldProduct.img[0]);
        }
    }, [singleSoldProduct]);

    const getYoutubeEmbed = (url) => {
        if (!url) return "";

        const regExp =
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/;
        const match = url.match(regExp);

        return match ? `https://www.youtube.com/embed/${match[1]}` : "";
    };

    if (isloading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-10">

            {/* LEFT SIDE - IMAGES */}
            <div className="space-y-4">

                {/* Main Image */}
                <div className="w-full h-[420px] rounded-xl overflow-hidden border">
                    <img
                        src={activeImage}
                        className="w-full h-full object-cover"
                        alt="product"
                    />
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 flex-wrap">
                    {singleSoldProduct?.img?.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            onClick={() => setActiveImage(img)}
                            className={`w-20 h-20 rounded-lg object-cover cursor-pointer border ${activeImage === img ? "border-red-500" : ""
                                }`}
                        />
                    ))}
                </div>

                {/* Video */}
                {singleSoldProduct?.video && (
                    <iframe
                        className="w-full h-[400px] rounded-xl"
                        src={getYoutubeEmbed(singleSoldProduct.video)}
                        title="Product Video"
                        frameBorder="0"
                        allowFullScreen
                    />
                )}
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">

                {/* Title */}
                {/* Title + Sold Badge */}
                <div className="flex gap-2 items-center justify-between">
                    <h1 className="text-3xl font-bold">{singleSoldProduct?.title}</h1>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                        SOLD
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                    <span className="line-through text-gray-400 text-xl">
                        {singleSoldProduct?.price} PKR
                    </span>
                    <span className="text-3xl font-bold text-green-600">
                        {singleSoldProduct?.saleprice} PKR
                    </span>


                </div>

                {/* Character ID */}
                <div className="bg-gray-100 p-3 rounded-lg">
                    <span className="font-semibold">Character ID:</span>{" "}
                    {singleSoldProduct?.characterid}
                </div>

                {/* Account Info */}
                <div className="bg-white border rounded-xl p-4 space-y-2">
                    <h2 className="font-semibold text-lg">Account Information</h2>

                    <p><b>Purchased Price:</b> {singleSoldProduct?.purchasedprice} PKR</p>
                    <p><b>Bought From:</b> {singleSoldProduct?.boughtfrom}</p>
                    <p><b>Account Email:</b> {singleSoldProduct?.accountemail}</p>
                    <p><b>Account Number:</b> {singleSoldProduct?.accountnumber}</p>
                    <p><b>Warranty Got:</b> {singleSoldProduct?.warrentygot}</p>
                </div>

                {/* Seller Info */}
                <div className="bg-gray-50 border rounded-xl p-4 space-y-2">
                    <h2 className="font-semibold text-lg">Seller Information</h2>

                    <p><b>Name:</b> {singleSoldProduct?.sellername}</p>
                    <p><b>WhatsApp:</b> {singleSoldProduct?.sellerwatsapp}</p>
                </div>

                {/* Buyer Info */}
                <div className="bg-green-50 border rounded-xl p-4 space-y-2">
                    <h2 className="font-semibold text-lg">Buyer Information</h2>

                    <p><b>Name:</b> {singleSoldProduct?.buyername}</p>
                    <p><b>Email:</b> {singleSoldProduct?.buyeremail}</p>
                    <p><b>Phone:</b> {singleSoldProduct?.buyernumber}</p>
                    <p><b>Warranty Given:</b> {singleSoldProduct?.warrentygiven}</p>
                </div>

                {/* Description */}
                <div className="border rounded-xl p-4">
                    <h2 className="font-semibold text-lg mb-2">Description</h2>
                    <p className="text-gray-700">{singleSoldProduct?.description}</p>
                </div>

            </div>
        </div>
    );
};