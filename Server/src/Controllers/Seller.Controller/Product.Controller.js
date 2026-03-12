
import Product from "../../Models/Product.Model.js";
import User from "../../Models/User.Model.js";
import ApiResponse from "../../Utils/ApiResponse.js";


export const AddProduct = async (req, res) => {
  try {
    const {
      userId, // Frontend must send logged-in user's ID
      characterid,
      img,
      video,
      title,
      price,
      saleprice,
      description,
      purchasedprice,
      boughtfrom,
      accountemail,
      accountnumber,
      warrentygot,
    } = req.body;

    // Validate required fields
    if (
      !userId ||
      !characterid ||
      !img ||
      !video ||
      !title ||
      !price ||
      !saleprice ||
      !description ||
      !boughtfrom ||
      !accountemail ||
      !accountnumber ||
      !warrentygot
    ) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "All fields are required"));
    }

    // Fetch the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    // Create product with seller info from user
    const product = new Product({
      characterid,
      img,
      video,
      title,
      price,
      saleprice,
      description,
      purchasedprice,
      boughtfrom,
      accountemail,
      accountnumber,
      warrentygot,
      sellername: user.username,
      sellerwatsapp: user.phone,
    });

    await product.save();

    res
      .status(201)
      .json(new ApiResponse(201, product, "Account Added Successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, error.message, "Cannot Add Account"));
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "No product exists"));
    }

    const {
      characterid,
      title,
      price,
      saleprice,
      description,
      sellername,
      sellerwatsapp,
      purchasedprice,
      boughtfrom,
      accountemail,
      accountnumber,
      warrentygot,
    } = req.body;

    console.log(req.body)
    if (!req.body) {
      return res
        .status(400)
        .json({ success: false, message: "No data sent" });
    }


    const updateproduct = {
      characterid,
      title,
      price,
      saleprice,
      description,
      sellername,
      sellerwatsapp,
      purchasedprice,
      boughtfrom,
      accountemail,
      accountnumber,
      warrentygot,
    };

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: updateproduct },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "No product exists"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, product, "Account Edited Successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, error.message, "Cannot Edit Account"));
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "No product to delete"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, product, "Account Deleted Successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, error.message, "Cannot Delete Account"));
  }
};

export const fetchProduct = async (req, res) => {
  try {
    const product = await Product.find({});

    res
      .status(200)
      .json(new ApiResponse(200, product, "Account fetched Successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, error.message, "Cannot fetch Account"));
  }
};

export const fetchSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "id required..!"));
    }

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "no product exists"));
    }
    res.status(200).json(
      new ApiResponse(201, product, "Single Product Fetched ")
    )
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, error.message, "Cannot fetch Account"));
  }
}