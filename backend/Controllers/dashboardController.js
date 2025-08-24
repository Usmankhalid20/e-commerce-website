const ListingProducts = require('../models/ListingProduct');

const dashboard = (req, res) => {
  try {
    res.json({ message: "Welcome Admin" });
  } catch (error) {
    console.log("Error in admin only controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const ListingProduct = async (req, res) => {
  try {
    const { title, price, mrp, discount, description, category, inStock } = req.body;

    if (!title || !price || !mrp || !description || !category || !inStock || !req.file ) {
      return res.status(400).json({ message: "All fields including image are required" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const finalPrice = discount > 0 ? mrp - (mrp * discount) / 100 : price;

    const newProduct = new ListingProducts({
      title,
      price: finalPrice,
      mrp,
      discount,
      description,
      category,
      inStock,
      image: imageUrl, // ✅ save full URL
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error in ListingProduct:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const Product = async (req, res) => {
  try {
    const products = await ListingProducts.find({});
    // console.log(products, "all products");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = { dashboard, ListingProduct, Product };