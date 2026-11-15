import React, { useState, useEffect } from "react";
import { ShoppingCart, Search, Filter, Eye, CheckCircle2 } from "lucide-react";
import axiosInstance from "../../lib/axios";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Modal from "../ui/Modal";
import Skeleton from "../ui/Skeleton";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`/admin/orders?status=${statusFilter}`);
      const data = Array.isArray(res.data?.data) ? res.data.data : Array.isArray(res.data) ? res.data : [];
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(`/admin/orders/${orderId}/status`, { orderStatus: newStatus });
      fetchOrders();
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update order status.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Order Management</h1>
        <p className="text-slate-500 text-sm mt-1">Track customer purchases, fulfillment status & shipping updates</p>
      </div>

      {/* Control Bar */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-700 uppercase">Filter Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">{orders.length}</span> orders
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Order ID</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Customer</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Total</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Date</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/80 transition-colors text-sm">
                    <td className="px-6 py-4 font-mono font-bold text-slate-900">
                      {order._id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{order.shippingInfo?.fullName}</div>
                      <div className="text-xs text-slate-500">{order.shippingInfo?.email}</div>
                    </td>
                    <td className="px-6 py-4 font-black text-slate-900">
                      RS. {order.total?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                        className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                      >
                        <option value="pending">PENDING</option>
                        <option value="processing">PROCESSING</option>
                        <option value="shipped">SHIPPED</option>
                        <option value="delivered">DELIVERED</option>
                        <option value="cancelled">CANCELLED</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600 font-medium">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowModal(true);
                        }}
                        className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Order Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {orders.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-sm">
                No order records found for this status.
              </div>
            )}
          </div>
        )}
      </Card>

      {/* View Order Modal */}
      {showModal && selectedOrder && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Order Details" maxWidth="max-w-lg">
          <div className="space-y-4 text-sm">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
              <p><span className="font-bold text-slate-700">Order ID:</span> <span className="font-mono">{selectedOrder._id}</span></p>
              <p><span className="font-bold text-slate-700">Payment Method:</span> <span className="uppercase">{selectedOrder.paymentMethod}</span></p>
              <p><span className="font-bold text-slate-700">Shipping Address:</span> {selectedOrder.shippingInfo?.address}, {selectedOrder.shippingInfo?.city}, {selectedOrder.shippingInfo?.country}</p>
              <p><span className="font-bold text-slate-700">Phone:</span> {selectedOrder.shippingInfo?.phone}</p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider">Ordered Items</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg border border-slate-100 text-xs">
                    <div>
                      <p className="font-bold text-slate-900">{item.title}</p>
                      <p className="text-slate-500">Qty: {item.quantity} x RS. {item.price?.toLocaleString()}</p>
                    </div>
                    <span className="font-black text-slate-900">RS. {item.subtotal?.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between font-extrabold text-slate-900">
              <span>Total Paid:</span>
              <span className="text-base text-blue-600">RS. {selectedOrder.total?.toLocaleString()}</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}