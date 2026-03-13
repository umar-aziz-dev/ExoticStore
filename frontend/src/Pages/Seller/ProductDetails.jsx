import { fetchSingleProduct } from "@/Store/SelllerSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const ProductDetails = () => {
    const { singleProduct, isloading } = useSelector((state) => state.Product);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        dispatch(fetchSingleProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (singleProduct?.img?.length) {
            setActiveImage(singleProduct.img[0]);
        }
    }, [singleProduct]);

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

                {/* Thumbnail Images */}
                <div className="flex gap-3 flex-wrap">
                    {singleProduct?.img?.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            onClick={() => setActiveImage(img)}
                            className={`w-20 h-20 rounded-lg object-cover cursor-pointer border ${activeImage === img ? "border-red-500" : ""
                                }`}
                        />
                    ))}
                </div>

                {singleProduct?.video && (
                    <iframe
                        className="w-full h-[400px] rounded-xl"
                        src={getYoutubeEmbed(singleProduct.video)}
                        title="Product Video"
                        frameBorder="0"
                        allowFullScreen
                    />
                )}
            </div>

            {/* RIGHT SIDE - PRODUCT INFO */}
            <div className="space-y-6">

                {/* Title */}
                <h1 className="text-3xl font-bold">{singleProduct?.title}</h1>

                {/* Price */}
                <div className="flex items-center gap-4">
                    <span className="line-through text-gray-400 text-xl">
                        {singleProduct?.price} Pkr
                    </span>
                    <span className="text-3xl font-bold text-green-600">
                        {singleProduct?.saleprice} Pkr
                    </span>

                </div>

                {/* Character ID */}
                <div className="bg-gray-100 p-3 rounded-lg">
                    <span className="font-semibold">Character ID:</span>{" "}
                    {singleProduct?.characterid}
                </div>

                {/* Account Information */}
                <div className="bg-white border rounded-xl p-4 space-y-2">

                    <h2 className="font-semibold text-lg">Account Information</h2>

                    <p><b>Purchased Price:</b> {singleProduct?.purchasedprice}Pkr</p>
                    <p><b>Bought From:</b> {singleProduct?.boughtfrom}</p>
                    <p><b>Account Email:</b> {singleProduct?.accountemail}</p>
                    <p><b>Account Number:</b> {singleProduct?.accountnumber}</p>
                    <p><b>Warranty:</b> {singleProduct?.warrentygot}</p>

                </div>

                {/* Seller Info */}
                <div className="bg-gray-50 border rounded-xl p-4 space-y-2">

                    <h2 className="font-semibold text-lg">Seller Information</h2>

                    <p><b>Name:</b> {singleProduct?.sellername}</p>
                    <p><b>WhatsApp:</b> {singleProduct?.sellerwatsapp}</p>
                </div>

                {/* Description */}
                <div className="border rounded-xl p-4">
                    <h2 className="font-semibold text-lg mb-2">Description</h2>
                    <p className="text-gray-700">{singleProduct?.description}</p>
                </div>

            </div>
        </div>
    );
};