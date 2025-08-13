import React from "react";
import { useAuth } from "../context/AuthContext";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useAuth();

  // Subtotal Calculation
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full min-h-screen py-4 px-2 sm:px-4">
      <div className="max-w-7xl bg-white min-h-[70vh] mt-20 px-4 sm:px-8 py-6 mx-auto rounded-lg shadow-md">
        <h1 className="text-lg sm:text-xl font-bold mb-4">Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 sm:px-4 py-2">Image</th>
                  <th className="px-2 sm:px-4 py-2">Product</th>
                  <th className="px-2 sm:px-4 py-2">Price</th>
                  <th className="px-2 sm:px-4 py-2">Quantity</th>
                  <th className="px-2 sm:px-4 py-2">Total</th>
                  <th className="px-2 sm:px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr
                    key={item.id}
                    className="text-center border border-gray-300"
                  >
                    <td className="px-2 sm:px-4 py-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover mx-auto rounded"
                      />
                    </td>
                    <td className="px-2 sm:px-4 py-2">{item.title}</td>
                    <td className="px-2 sm:px-4 py-2">${item.price.toFixed(2)}</td>
                    <td className="px-2 sm:px-4 py-2">{item.quantity}</td>
                    <td className="px-2 sm:px-4 py-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-2 sm:px-4 py-2">
                      <RxCross2
                        className="text-lg sm:text-xl text-red-500 cursor-pointer hover:text-red-700 mx-auto"
                        onClick={() => removeFromCart(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Subtotal Section */}
            <div className="w-full flex flex-col sm:flex-row sm:justify-end mt-8 px-0 sm:px-4">
              <div className="w-full sm:w-96 text-black rounded-lg shadow-lg p-4 sm:p-6 bg-gray-50">
                {/* Cart Heading */}
                <h1 className="text-lg sm:text-2xl font-bold border-b border-gray-300 pb-2 mb-4">
                  Cart Summary
                </h1>

                {/* Subtotal */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-base sm:text-lg font-medium">Subtotal:</span>
                  <span className="text-lg sm:text-xl font-bold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {/* Buy Now Button */}
                <Link
                  to="/checkout"
                  className="block w-full text-center bg-green-400 hover:bg-green-500 text-black hover:text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
