import Product from "../../Models/Product.Model.js";
import ApiResponse from "../../Utils/ApiResponse.js";

export const fetchAllProduct = async (req, res) => {
  try {
    // Fetch only available products and exclude sensitive fields
    const product = await Product.find({ sold: "Available" }).select(
      "-purchasedprice -boughtfrom -accountemail -accountnumber -warrentygot -buyername -buyeremail -buyernumber -warrentygiven"
    );

    if (!product || product.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    res.status(200).json(
      new ApiResponse(200, product, "User products fetched successfully")
    );
  } catch (error) {
    res.status(400).json(
      new ApiResponse(400, error, "Failed to fetch user products")
    );
  }
};

export const fetchSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "id required"));
    }

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "No Product Exists"));
    }

    res.status(200).json(
      new ApiResponse(201, product, "Single Product Fetched Successfully")
    )

  } catch (error) {
    res.status(400).json(
      new ApiResponse(400, error, "Failed to fetch single products")
    );
  }
}