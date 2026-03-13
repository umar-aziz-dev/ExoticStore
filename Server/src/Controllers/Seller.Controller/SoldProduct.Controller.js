
import Product from "../../Models/Product.Model.js";
import ApiResponse from "../../Utils/ApiResponse.js";


export const fetchSoldProducts = async (req, res) => {
    try {
        const product = await Product.find({ sold: "Sold" });
        if (!product) {
            return res
                .status(404)
                .json(new ApiResponse(404, null, "Cannot Find Product"));
        }

        res.status(200).json(
            new ApiResponse(201, product, "All Sold Products Fetched Successfully")
        )
    } catch (error) {
        res
            .status(500)
            .json(new ApiResponse(500, error.message, "Cannot fetch the sold products"));
    }
}



export const UpdateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res
                .status(404)
                .json(new ApiResponse(404, null, "id required..!"));
        }

        const { sold, buyername, buyeremail, buyernumber, warrentygiven } = req.body;
        if (!sold || !buyername || !buyeremail || !buyernumber || !warrentygiven) {
            return res
                .status(404)
                .json(new ApiResponse(404, null, "All Fields Are Required"));
        }

        const product = await Product.findByIdAndUpdate(
            id,
            {
                sold,
                buyername,
                buyeremail,
                buyernumber,
                warrentygiven,
            },
            { new: true } // This ensures the updated document is returned
        );
        if (!product) {
            return res
                .status(404)
                .json(new ApiResponse(404, null, "Cannot Find Product"));
        }

        res.status(200).json(
            new ApiResponse(201, product, "Status Updated Successfully")
        )
    } catch (error) {
        res
            .status(500)
            .json(new ApiResponse(500, error.message, "Cannot update the status"));
    }
}

export const fetchSingleSoldProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res
                .status(404)
                .json(new ApiResponse(404, null, "id required..!"));
        }

        const product = await Product.findOne({
            _id: id,
            sold: "Sold"
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Sold product not found"
            });
        }

        res.status(200).json(
            new ApiResponse(201, product, "Single Sold Product Fetched Successfully")
        )

    } catch (error) {
        res
            .status(500)
            .json(new ApiResponse(500, error.message, "Cannot  Fetch Single Sold Product "));
    }
}