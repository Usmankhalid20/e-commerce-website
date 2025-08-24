const mongoose = require("mongoose");
const dotenv = require("dotenv");

const ListingProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: [0, "Price must be a positive number"],
    },
    mrp: {
        type: Number,
        required: [true, "Please provide the MRP"],
        min: [0, "MRP must be a positive number"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
    },
    inStock: {
      type: Number,
      required: [true, "Please provide stock quantity"],
      min: [0, "Stock quantity cannot be negative"],
    },
    image: {
      type: String,
      required: ["Please provide an image URL"],
    },
  },
  {
    timestamps: true,
  }
);

const ListingProduct = mongoose.model("ListingProduct", ListingProductSchema);
module.exports = ListingProduct;
