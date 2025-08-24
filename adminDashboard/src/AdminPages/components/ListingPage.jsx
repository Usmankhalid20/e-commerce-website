import { useState } from "react";

const ListingPage = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: 0,
    mrp: 0, // ✅ added here
    category: "",
    inStock: 5,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "mrp" || name === "inStock"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("mrp", product.mrp);
      formData.append("category", product.category);
      formData.append("inStock", product.inStock);
      formData.append("image", product.image); // 👈 file from input

      const response = await fetch(
        "http://localhost:5000/api/adminAuth/listing",
        {
          method: "POST",
          body: formData,
          credentials: "include", // if using cookies for auth
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Product added successfully!");
        // onAddProduct(data); // update UI
      } else {
        console.error("Error:", data.message);
      }

      // Reset form
      setProduct({
        title: "",
        description: "",
        image: "",
        buttonText: "Buy Now",
        price: 0,
        mrp: 0,
        category: "",
        inStock: 5,
      });

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Product Management
        </h1>
        <p className="text-gray-600">
          Manage and monitor all product in your system
        </p>
      </div>
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
              <svg
                className="w-8 h-8 mb-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16V8a4 4 0 018 0v8m-4 4h.01"
                />
              </svg>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag &
                drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, JPEG</p>
              <input
                id="file-upload"
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) =>
                  setProduct({ ...product, image: e.target.files[0] })
                }
                className="hidden"
                required
              />
            </label>
          </div>
        </div>

         {/* Price + MRP + Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (RS)
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              min="0"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              MRP (RS)
            </label>
            <input
              type="number"
              name="mrp"
              value={product.mrp}
              onChange={handleChange}
              min="0"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              name="inStock"
              value={product.inStock}
              onChange={handleChange}
              min="0"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ListingPage;
