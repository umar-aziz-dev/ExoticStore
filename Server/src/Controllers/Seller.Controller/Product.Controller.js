import Product from "../../Models/Product.Model.js";
import ApiResponse from "../../Utils/ApiResponse.js";

export const AddProduct = async (req, res) => {
    try {
        const { img, video, title, price, saleprice, description, sellername, sellerwatsapp } = req.body;
        if (!img || !video || !title || !price || !saleprice || !description || !sellername || !sellerwatsapp) {
            return res.status(400).json(
                new ApiResponse(401, null, "All Fields are required")
            )
        }

        const product = new Product({
            img, video, title, price, saleprice, description, sellername, sellerwatsapp,
        })

        product.save();

        res.status(200).json(
            new ApiResponse(201, product, "Account Added Successfully")
        )


    } catch (error) {
        res.status(400).json(
            new ApiResponse(401, error, "Cannot Add Account")
        )
    }
}

export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json(
                new ApiResponse(401, null, "no product exists")
            )
        }

        const { title, price, saleprice, description, sellername, sellerwatsapp } = req.body;
        if (!title || !price || !saleprice || !description || !sellername || !sellerwatsapp) {
            return res.status(400).json(
                new ApiResponse(401, null, "All Fields are required")
            )
        }
        const updateproduct = {};
        updateproduct.title = title;
        updateproduct.price = price;
        updateproduct.saleprice = saleprice;
        updateproduct.description = description;
        updateproduct.sellername = sellername;
        updateproduct.sellerwatsapp = sellerwatsapp;

        const product = await Product.findByIdAndUpdate(id,
            { $set: updateproduct },
            { new: true, runValidators: true }
        )
        if (!product) {
            return res.status(400).json(
                new ApiResponse(401, null, "no product exists")
            )
        }

        res.status(200).json(
            new ApiResponse(201, product, "Account Edited Successfully")
        )

    } catch (error) {
        res.status(400).json(
            new ApiResponse(401, error, "Cannot Edit Account")
        )
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json(
                new ApiResponse(401, null, "no product exists")
            )
        }
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(400).json(
                new ApiResponse(401, null, "no product to delete")
            )
        }

        res.status(200).json(
            new ApiResponse(201, product, "Account Deleted Successfully")
        )


    } catch (error) {
        res.status(400).json(
            new ApiResponse(401, error, "Cannot Delete Account")
        )
    }
}

export const fetchProduct = async (req, res) => {
    try {
        const product = await Product({});
        if (!product) {
            return res.status(400).json(
                new ApiResponse(401, null, "no product to fetch")
            )
        }

        res.status(200).json(
            new ApiResponse(201, product, "Account fetched Successfully")
        )

    } catch (error) {
        res.status(400).json(
            new ApiResponse(401, error, "Cannot fetch Account")
        )
    }
}