import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const shippingThreshold = 10000;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 200;
  const total = subtotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4">
        <EmptyState
          icon={ShoppingBag}
          title="Your Cart is Empty"
          description="Looks like you haven't added any skincare products to your bag yet."
          action={
            <Link to="/shop">
              <Button size="lg" className="shadow-lg shadow-blue-600/20">
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Shopping Bag ({cart.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const itemId = item._id || item.id;
            return (
              <Card key={itemId} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-slate-100 shrink-0"
                />

                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {item.category || "Skincare"}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mt-1 truncate">{item.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">RS. {item.price?.toLocaleString()} each</p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-white">
                    <button
                      onClick={() => updateQuantity(itemId, Math.max(1, item.quantity - 1))}
                      className="p-1.5 text-slate-600 hover:text-slate-900"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(itemId, item.quantity + 1)}
                      className="p-1.5 text-slate-600 hover:text-slate-900"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <span className="font-extrabold text-slate-900 text-sm w-24 text-right">
                    RS. {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                  </span>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(itemId)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            );
          })}

          <div className="flex justify-between items-center pt-2">
            <Button variant="ghost" size="sm" onClick={clearCart} className="text-slate-500 hover:text-red-600">
              Clear Shopping Bag
            </Button>
            <Link to="/shop">
              <Button variant="outline" size="sm">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        {/* Order Summary Side Card */}
        <div>
          <Card className="p-6 space-y-6 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 pb-4 border-b border-slate-100">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">RS. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-semibold text-slate-900">
                  {shippingCost === 0 ? <span className="text-emerald-600">FREE</span> : `RS. ${shippingCost}`}
                </span>
              </div>
              {subtotal < shippingThreshold && (
                <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                  Add RS. {(shippingThreshold - subtotal).toLocaleString()} more to qualify for FREE Shipping!
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
              <span className="text-base font-bold text-slate-900">Total</span>
              <span className="text-2xl font-black text-slate-900">RS. {total.toLocaleString()}</span>
            </div>

            <Button
              size="lg"
              onClick={() => navigate("/checkout")}
              className="w-full shadow-lg shadow-blue-600/20"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
