import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ShoppingCart = ({ isCartOpen, setIsCartOpen }) => {
  const { cart, removeFromCart } = useAuth();

  // Subtotal Calculation
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* ShoppingCart Drawer */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <RxCross2
            className="text-2xl cursor-pointer hover:text-red-500"
            onClick={() => setIsCartOpen(false)}
          />
        </div>

        {/* ShoppingCart Items */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-150px)]">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div className="flex gap-4 items-center" key={item.id}>
                <div className="w-20 h-20 overflow-hidden rounded-md border">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-md font-medium">{item.title}</h1>
                  <p className="text-sm text-gray-600">
                    RS {item.price} × {item.quantity}
                  </p>
                </div>
                <RxCross2
                  className="text-xl text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => removeFromCart(item.id)}
                />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="flex justify-between font-semibold mb-4">
            <span>Subtotal:</span>
            <span>RS. {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex gap-2">
            <Link
              to="/cart"
              className="flex-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-center text-sm font-medium"
              onClick={() => setIsCartOpen(false)}
            >
              View ShoppingCart
            </Link>
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">
              <Link to="/checkout">Checkout</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
