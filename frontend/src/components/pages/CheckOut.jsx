import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const CheckOut = () => {
  const { cart } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full min-h-screen px-4 py-10 bg-gray-400">
      <div className="bg-white mt-10 px-6 py-6 rounded-lg shadow-md">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          
          {/* FORM SECTION */}
          <div className="w-full lg:w-1/2">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-lg rounded-lg p-6 space-y-6"
            >
              <h2 className="text-2xl font-bold border-b pb-2">
                Place Your Order
              </h2>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* City / Postal Code / Country */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Payment */}
              <div>
                <label className="block text-sm font-medium mb-1">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              {/* Total */}
              <div className="border-t pt-4 flex justify-between font-semibold">
                <span>Total:</span>
                <span>RS. {subtotal.toFixed(2)}</span>
              </div>

              {/* Place Order */}
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-all duration-300"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* ORDER SUMMARY */}
          <div className="w-full lg:w-1/2 bg-gray-100 rounded-lg shadow-md">
            <div className="p-4 space-y-4 overflow-y-auto max-h-[400px]">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div
                    className="flex items-center justify-between rounded-lg p-2"
                    key={item.id}
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 border py-1 rounded-lg px-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex-1 px-4">
                      <h1 className="text-md font-medium">{item.title}</h1>
                    </div>

                    {/* Price */}
                    <div className="text-sm text-gray-800 font-semibold">
                      RS. {item.price}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Subtotal */}
            <div className="p-4 border-t">
              <div className="flex justify-between font-semibold mb-4">
                <span>Subtotal:</span>
                <span>RS. {subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
