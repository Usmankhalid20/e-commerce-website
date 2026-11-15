import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, CheckCircle2, ArrowRight, Truck } from "lucide-react";
import axiosInstance from "../lib/axios";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";

export default function CheckOut() {
  const { cart, clearCart } = useCartStore();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: authUser?.fullName || "",
    email: authUser?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [completedOrder, setCompletedOrder] = useState(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  const shippingCost = subtotal >= 10000 || subtotal === 0 ? 0 : 200;
  const estimatedTotal = subtotal + shippingCost;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const itemsPayload = cart.map((item) => ({
        productId: item._id || item.id,
        quantity: item.quantity || 1,
      }));

      const res = await axiosInstance.post("/orders", {
        items: itemsPayload,
        shippingInfo,
        paymentMethod,
      });

      if (res.data?.success) {
        setCompletedOrder(res.data.data);
        clearCart();
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-100 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Order Placed Successfully!</h2>
            <p className="text-sm text-slate-500 mt-2">Thank you for your purchase with OneDrop Skincare.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Order Number:</span>
              <span className="font-mono font-bold text-slate-900">{completedOrder.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Status:</span>
              <span className="font-bold text-emerald-600 uppercase">{completedOrder.orderStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Total Paid:</span>
              <span className="font-black text-slate-900">RS. {completedOrder.total?.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-2">
            <Link to="/shop">
              <Button size="lg" className="w-full">
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 text-center bg-white rounded-2xl border border-slate-100 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 mb-2">No Items to Checkout</h2>
        <p className="text-sm text-slate-500 mb-6">Your shopping bag is currently empty.</p>
        <Link to="/shop">
          <Button variant="primary">Browse Store</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Checkout & Shipping</h1>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm font-medium rounded-2xl border border-red-200">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Information Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 text-slate-900">
              <Truck className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold">1. Shipping Address</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                required
                placeholder="John Doe"
                value={shippingInfo.fullName}
                onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
              />

              <Input
                label="Email Address"
                type="email"
                required
                placeholder="john@example.com"
                value={shippingInfo.email}
                onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                required
                placeholder="+92 300 1234567"
                value={shippingInfo.phone}
                onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
              />

              <Input
                label="Street Address"
                required
                placeholder="House #123, Street 4"
                value={shippingInfo.address}
                onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="City"
                required
                placeholder="Lahore"
                value={shippingInfo.city}
                onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
              />

              <Input
                label="Postal Code"
                required
                placeholder="54000"
                value={shippingInfo.postalCode}
                onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
              />

              <Input
                label="Country"
                required
                placeholder="Pakistan"
                value={shippingInfo.country}
                onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
              />
            </div>
          </Card>

          {/* Payment Method */}
          <Card className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 text-slate-900">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold">2. Payment Option</h2>
            </div>

            <label className="flex items-center justify-between p-4 border rounded-xl bg-slate-50 cursor-pointer border-blue-500 ring-2 ring-blue-500/20">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="w-4 h-4 text-blue-600"
                />
                <div>
                  <p className="font-bold text-slate-900 text-sm">Cash on Delivery (COD)</p>
                  <p className="text-xs text-slate-500">Pay cash upon delivery to your doorstep</p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase bg-blue-100 px-2 py-0.5 rounded-full">Standard</span>
            </label>
          </Card>
        </div>

        {/* Order Summary & Submit */}
        <div>
          <Card className="p-6 space-y-6 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 pb-4 border-b border-slate-100">
              Order Review
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item._id || item.id} className="flex justify-between items-center text-xs">
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-slate-800 truncate">{item.title}</p>
                    <p className="text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-slate-900 shrink-0">
                    RS. {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">RS. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-semibold text-slate-900">
                  {shippingCost === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `RS. ${shippingCost}`}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
              <span className="text-base font-bold text-slate-900">Total Due</span>
              <span className="text-2xl font-black text-slate-900">RS. {estimatedTotal.toLocaleString()}</span>
            </div>

            <Button
              type="submit"
              size="lg"
              isLoading={isSubmitting}
              className="w-full shadow-lg shadow-blue-600/20"
            >
              <span>Place Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        </div>
      </form>
    </div>
  );
}
