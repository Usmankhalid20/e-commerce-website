import { useState } from 'react';

const ListingPage = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    image: '',
    buttonText: 'Buy Now',
    price: 0,
    mrp: 0,
    category: '',
    inStock: 5
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'mrp' || name === 'inStock' 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, you would call your API here
      // For now, we'll just simulate it
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newProduct = {
        ...product,
        id: Date.now().toString() // Generate a temporary ID
      };
      
      onAddProduct(newProduct);
      setSuccessMessage('Product added successfully!');
      
      // Reset form
      setProduct({
        title: '',
        description: '',
        image: '',
        buttonText: 'Buy Now',
        price: 0,
        mrp: 0,
        category: '',
        inStock: 5
      });
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
        <p className="text-gray-600">Manage and monitor all product in your system</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">MRP (₹)</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
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
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
          <input
            type="text"
            name="buttonText"
            value={product.buttonText}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default ListingPage;