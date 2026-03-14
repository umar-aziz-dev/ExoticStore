import { useState, useEffect } from "react";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/Components/ui/select";
import { fetchAllProduct } from "@/Store/UserProductSlice";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { ProductTile } from "./ProductTile";
import { Button } from "@/Components/ui/button";

export const UserListing = () => {
    const { productList, isloading } = useSelector((state) => state.UserProduct);
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState(""); // Input value
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchPrice, setSearchPrice] = useState(""); // Price filter

    useEffect(() => {
        dispatch(fetchAllProduct());
    }, [dispatch]);

    // Filter products whenever searchTerm, searchPrice, or productList changes
    useEffect(() => {
        let filtered = productList;

        // Filter by search term
        if (searchTerm.trim() !== "") {
            filtered = filtered.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by price
        if (searchPrice !== "") {
            filtered = filtered.filter((product) => {
                const price = Number(product.price); // Assuming price is numeric
                switch (searchPrice) {
                    case "50k":
                        return price <= 50000;
                    case "100k":
                        return price <= 100000;
                    case "200k":
                        return price <= 200000;
                    case "300k":
                        return price <= 300000;
                    case "400k":
                        return price <= 400000;
                    case "500k":
                        return price <= 500000;
                    case "more500k":
                        return price > 500000;
                    default:
                        return true;
                }
            });
        }

        setFilteredProducts(filtered);
    }, [productList, searchTerm, searchPrice]);

    const handleSearch = () => {
        // Optional: You can keep this empty since filtering happens in useEffect
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-6">

            {/* Title */}
            <p className="text-2xl md:text-4xl font-bold mb-6">
                Browse Accounts
            </p>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center 
                      bg-red-900  border border-red-700 
                      rounded-xl p-4 shadow-lg">

                {/* Search */}
                {/* Search */}
                <div className="relative w-full md:w-[500px] lg:w-[750px] flex items-center">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={18} />
                    <Input
                        placeholder="Search Accounts..."
                        className="pl-10 h-11 rounded-lg bg-white bg-opacity-90 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button
                        onClick={handleSearch}
                        className="ml-2 bg-red-700 text-white h-11 px-4 rounded-lg"
                    >
                        Search
                    </Button>
                </div>

                {/* Price Dropdown */}
                {/* Price Dropdown */}
                <Select value={searchPrice} onValueChange={(val) => setSearchPrice(val)}>
                    <SelectTrigger className="w-full md:w-[200px] lg:w-[400px] h-11 rounded-lg bg-white">
                        <SelectValue placeholder="Filter by Price" />
                    </SelectTrigger>

                    <SelectContent className="bg-white text-black">
                        <SelectItem value="50k">Less than 50k</SelectItem>
                        <SelectItem value="100k">Less than 100k</SelectItem>
                        <SelectItem value="200k">Less than 200k</SelectItem>
                        <SelectItem value="300k">Less than 300k</SelectItem>
                        <SelectItem value="400k">Less than 400k</SelectItem>
                        <SelectItem value="500k">Less than 500k</SelectItem>
                        <SelectItem value="more500k">More than 500k</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* All Products */}
            {/* All Products */}
            <div>
                <p className="text-2xl text-red-600 md:text-4xl font-bold mt-8">All Products</p>

                {/* Responsive Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">

                    {isloading ? (
                        // Loading skeletons
                        Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="bg-gray-200 animate-pulse h-48 rounded-lg"></div>
                        ))
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((Product) => (
                            <ProductTile key={Product._id} Product={Product} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500 mt-6">
                            No accounts found for "{searchTerm}"
                        </p>
                    )}

                </div>
            </div>
        </div>
    );
};