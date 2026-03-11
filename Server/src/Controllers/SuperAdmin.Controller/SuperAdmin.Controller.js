import ApiError from "../../Utils/ApiError.js";
import User from "../../Models/User.Model.js";
import ApiResponse from "../../Utils/ApiResponse.js";


export const CreateAdmin = async (req, res) => {
    try {

        const { email, role } = req.body;

        if (!email || !role) {
            throw new ApiError(400, "Email and Role are required");
        }

        const user = await User.findOneAndUpdate(
            { email: email },
            { role: role },
            { returnDocument: "after" }
        );

        if (!user) {
            return res.status(404).json(
                new ApiResponse(404, null, "No user with this email")
            );
        }

        res.status(200).json(
            new ApiResponse(200, user, "Role changed to Admin successfully")
        );

    } catch (error) {

        res.status(500).json(
            new ApiResponse(500, null, "Cannot change role to admin")
        );

    }
};



export const DeleteAdmin = async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json(
                new ApiResponse(400, null, "ID is required")
            );
        }

        const user = await User.findByIdAndUpdate(
            id,
            { role: "user" },
            { returnDocument: "after" }
        );

        if (!user) {
            return res.status(404).json(
                new ApiResponse(404, null, "No user found with this ID")
            );
        }

        res.status(200).json(
            new ApiResponse(200, user, "Admin removed successfully")
        );

    } catch (error) {

        res.status(500).json(
            new ApiResponse(500, null, "Cannot remove admin")
        );

    }
};



export const FetchAdmin = async (req, res) => {
    try {

        const admins = await User.find({ role: "seller" }).select("-password");

        if (!admins.length) {
            return res.status(404).json(
                new ApiResponse(404, null, "No admins found")
            );
        }

        res.status(200).json(
            new ApiResponse(200, admins, "Admins fetched successfully")
        );

    } catch (error) {

        res.status(500).json(
            new ApiResponse(500, null, "Cannot fetch admins")
        );

    }
};