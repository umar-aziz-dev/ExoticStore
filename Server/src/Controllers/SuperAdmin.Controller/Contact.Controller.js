import Contact from "../../Models/Contact.Model.js";
import ApiResponse from "../../Utils/ApiResponse.js";



export const AddContact = async (req, res) => {
    try {
        const { email, phone } = req.body;
        if (!email || !phone) {
            return res.status(400).json(
                new ApiResponse(401, null, "All Fields Required")
            )
        }

        const contact = await Contact.create({
            email,
            phone,
        })

        res.status(200).json(
            new ApiResponse(201, contact, "Contact Added Successfully")
        )
    } catch (error) {
        res.status(400).json(
            new ApiResponse(401, error, "Cannot Add Contact")
        )
    }
}

export const fetchContact = async (req, res) => {
    try {
        const contact = await Contact.findOne();
        if (!contact) {
            return res.status(400).json(
                new ApiResponse(401, null, "No Contact Exist")
            )
        }
        res.status(200).json(
            new ApiResponse(201, contact, "Contact Fetched Successfully ")
        )
    } catch (error) {
        res.status(400).json(
            new ApiResponse(401, error, "Cannot fetch Contact")
        )
    }
}

export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findOneAndDelete();

        if (!contact) {
            return res.status(404).json(
                new ApiResponse(404, null, "No contact found to delete")
            );
        }

        return res.status(200).json(
            new ApiResponse(200, contact, "Contact deleted successfully")
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, error.message, "Cannot delete contact")
        );
    }
};