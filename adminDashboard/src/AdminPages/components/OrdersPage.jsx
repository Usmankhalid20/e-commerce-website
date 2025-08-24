import { useState } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      date: "2023-08-15T10:30:00",
      customer: {
        name: "Priya Sharma",
        email: "priya.sharma@example.com",
        phone: "+91 9876543210",
        address: "123 Main St, Mumbai, Maharashtra 400001"
      },
      items: [
        {
          id: "1",
          name: "HydraBoost Serum",
          category: "Hydration",
          price: 899,
          quantity: 2,
          image: "https://i.pinimg.com/736x/6e/db/b3/6edbb36883dbf3d78204803e81bda280.jpg"
        }
      ],
      amount: 1798,
      shippingCost: 50,
      tax: 180,
      status: "delivered",
      payment: {
        method: "Credit Card",
        status: "paid"
      }
    },
    {
      id: "ORD-1000",
      date: "2023-08-14T14:45:00",
      customer: {
        name: "Rahul Patel",
        email: "rahul.patel@example.com",
        phone: "+91 8765432109",
        address: "456 Oak Ave, Bangalore, Karnataka 560001"
      },
      items: [
        {
          id: "1",
          name: "HydraBoost Serum",
          category: "Hydration",
          price: 899,
          quantity: 1,
          image: "https://i.pinimg.com/736x/6e/db/b3/6edbb36883dbf3d78204803e81bda280.jpg"
        }
      ],
      amount: 899,
      shippingCost: 50,
      tax: 90,
      status: "shipped",
      payment: {
        method: "UPI",
        status: "paid"
      }
    },
    {
      id: "ORD-999",
      date: "2023-08-12T09:15:00",
      customer: {
        name: "Ananya Gupta",
        email: "ananya.gupta@example.com",
        phone: "+91 7654321098",
        address: "789 Pine Rd, Delhi, Delhi 110001"
      },
      items: [
        {
          id: "1",
          name: "HydraBoost Serum",
          category: "Hydration",
          price: 899,
          quantity: 1,
          image: "https://i.pinimg.com/736x/6e/db/b3/6edbb36883dbf3d78204803e81bda280.jpg"
        }
      ],
      amount: 899,
      shippingCost: 50,
      tax: 90,
      status: "processing",
      payment: {
        method: "Net Banking",
        status: "paid"
      }
    },
    {
      id: "ORD-998",
      date: "2023-08-10T16:20:00",
      customer: {
        name: "Vikram Singh",
        email: "vikram.singh@example.com",
        phone: "+91 6543210987",
        address: "321 Elm St, Hyderabad, Telangana 500001"
      },
      items: [
        {
          id: "1",
          name: "HydraBoost Serum",
          category: "Hydration",
          price: 899,
          quantity: 1,
          image: "https://i.pinimg.com/736x/6e/db/b3/6edbb36883dbf3d78204803e81bda280.jpg"
        }
      ],
      amount: 899,
      shippingCost: 50,
      tax: 90,
      status: "pending",
      payment: {
        method: "COD",
        status: "pending"
      }
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  // Filter orders based on status and search query
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Orders Management</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
          
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customer.name}</div>
                    <div className="text-sm text-gray-500">{order.customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'shipped' ? 'bg-indigo-100 text-indigo-800' :
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold">Order Details - {selectedOrder.id}</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Customer Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm"><span className="font-medium">Name:</span> {selectedOrder.customer.name}</p>
                    <p className="text-sm mt-1"><span className="font-medium">Email:</span> {selectedOrder.customer.email}</p>
                    <p className="text-sm mt-1"><span className="font-medium">Phone:</span> {selectedOrder.customer.phone}</p>
                    <p className="text-sm mt-1"><span className="font-medium">Address:</span> {selectedOrder.customer.address}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Order Summary</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>Date:</span>
                      <span>{new Date(selectedOrder.date).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>Status:</span>
                      <div className="relative">
                        <select
                          value={selectedOrder.status}
                          onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value)}
                          className="block appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>Payment Method:</span>
                      <span>{selectedOrder.payment.method}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>Payment Status:</span>
                      <span className={`font-medium ${
                        selectedOrder.payment.status === 'paid' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedOrder.payment.status.charAt(0).toUpperCase() + selectedOrder.payment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded object-cover" src={item.image} alt={item.name} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                <div className="text-sm text-gray-500">{item.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <div className="bg-gray-50 p-4 rounded-lg w-full md:w-1/3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>₹{selectedOrder.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Shipping:</span>
                    <span>₹{selectedOrder.shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Tax:</span>
                    <span>₹{selectedOrder.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-medium text-gray-900 mt-2 pt-2 border-t border-gray-200">
                    <span>Total:</span>
                    <span>₹{(selectedOrder.amount + selectedOrder.shippingCost + selectedOrder.tax).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;