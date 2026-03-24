import { useSelector } from "react-redux";

export const UserContacts = () => {
    const { contactInfo, isloading } = useSelector((state) => state.Contact);

    // Loading skeleton
    if (isloading) {
        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
        );
    }

    if (!contactInfo) {
        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center text-gray-500">
                No contact found.
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Info</h2>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Email:</span>
                    <span className="text-gray-600">{contactInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Phone:</span>
                    <span className="text-gray-600">{contactInfo.phone}</span>
                </div>
            </div>
        </div>
    );
};