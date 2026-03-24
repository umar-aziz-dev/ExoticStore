import Social from "../../Models/SocialLinks.Model.js";
import ApiResponse from "../../Utils/ApiResponse.js";

// ADD or UPDATE (single document)
export const AddSocialLinks = async (req, res) => {
    try {
        const { facebook, instagram, tiktok } = req.body;

        if (!facebook || !instagram || !tiktok) {
            return res.status(400).json(
                new ApiResponse(400, null, "All fields are required")
            );
        }

        // Check if already exists
        let social = await Social.findOne();

        if (social) {
            // Update existing
            social.facebook = facebook;
            social.instagram = instagram;
            social.tiktok = tiktok;

            await social.save();
        } else {
            // Create new
            social = await Social.create({
                facebook,
                instagram,
                tiktok,
            });
        }

        return res.status(200).json(
            new ApiResponse(200, social, "Social links saved successfully")
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, error.message, "Cannot save social links")
        );
    }
};

// FETCH (single document)
export const fetchSocialLinks = async (req, res) => {
    try {
        const social = await Social.findOne();

        if (!social) {
            return res.status(404).json(
                new ApiResponse(404, null, "No social links found")
            );
        }

        return res.status(200).json(
            new ApiResponse(200, social, "Social links fetched successfully")
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, error.message, "Cannot fetch social links")
        );
    }
};