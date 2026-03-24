import Policy from "../../Models/Policies.Model.js";
import ApiResponse from "../../Utils/ApiResponse.js";

// ➤ Add Policy
export const AddPolicy = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json(
                new ApiResponse(400, null, "All fields are required")
            );
        }

        const policy = await Policy.create({ name, description });

        return res.status(201).json(
            new ApiResponse(201, policy, "Policy added successfully")
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, error.message, "Cannot add policy")
        );
    }
};


// ➤ Fetch Policies
export const fetchPolicy = async (req, res) => {
    try {
        const policies = await Policy.find({});

        if (policies.length === 0) {
            return res.status(404).json(
                new ApiResponse(404, [], "No policies found")
            );
        }

        return res.status(200).json(
            new ApiResponse(200, policies, "Policies fetched successfully")
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, error.message, "Cannot fetch policies")
        );
    }
};


// ➤ Delete Policy
export const deletePolicy = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json(
                new ApiResponse(400, null, "ID is required")
            );
        }

        const policy = await Policy.findByIdAndDelete(id);

        if (!policy) {
            return res.status(404).json(
                new ApiResponse(404, null, "Policy not found")
            );
        }

        return res.status(200).json(
            new ApiResponse(200, policy, "Policy deleted successfully")
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, error.message, "Cannot delete policy")
        );
    }
};


// ➤ Edit Policy
export const editPolicy = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!id) {
            return res.status(400).json(
                new ApiResponse(400, null, "ID is required")
            );
        }

        if (!name || !description) {
            return res.status(400).json(
                new ApiResponse(400, null, "All fields are required")
            );
        }

        const policy = await Policy.findByIdAndUpdate(
            id,
            { name, description }, // ✅ FIXED
            { new: true }
        );

        if (!policy) {
            return res.status(404).json(
                new ApiResponse(404, null, "Policy not found")
            );
        }

        return res.status(200).json(
            new ApiResponse(200, policy, "Policy updated successfully")
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, error.message, "Cannot edit policy")
        );
    }
};