import Product from "../../Models/Product.Model.js";

export const fetchSoldProduct = async (req, res) => {
  try {
    const product = await Product.find({ sold: "Sold" });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching sold products",
    });
  }
};
export const fetchAvailableProduct=async(req,res)=>{
    try {
        const product = await Product.find({sold:"Available"});
        res.status(200).json({
      success: true,
      data: product,
    });
    } catch (error) {
         res.status(500).json({
      success: false,
      message: "Error fetching fetching avalible products",
    });
    }
}