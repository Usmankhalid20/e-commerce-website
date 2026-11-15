import React, { useState, useEffect } from "react";
import { Plus, Search, Edit3, Trash2, Package } from "lucide-react";
import axiosInstance from "../../lib/axios";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import Badge from "../ui/Badge";
import Skeleton from "../ui/Skeleton";

export default function ListingPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    mrp: "",
    discount: "0",
    category: "cleanser",
    inStock: "10",
  });
  const [imageFile, setImageFile] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formMsg, setFormMsg] = useState({ error: "", success: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/admin/products");
      const data = Array.isArray(res.data?.data) ? res.data.data : Array.isArray(res.data) ? res.data : [];
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormMsg({ error: "", success: "" });

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (imageFile) data.append("productImage", imageFile);

      const res = await axiosInstance.post("/admin/listing", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        setFormMsg({ error: "", success: "Product created successfully!" });
        setFormData({ title: "", description: "", price: "", mrp: "", discount: "0", category: "cleanser", inStock: "10" });
        setImageFile(null);
        fetchProducts();
        setTimeout(() => {
          setShowAddModal(false);
          setFormMsg({ error: "", success: "" });
        }, 1200);
      }
    } catch (err) {
      setFormMsg({ error: err.response?.data?.message || "Failed to create product.", success: "" });
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;
    setFormLoading(true);
    setFormMsg({ error: "", success: "" });

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (imageFile) data.append("productImage", imageFile);

      const res = await axiosInstance.put(`/admin/products/${selectedProduct._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        setFormMsg({ error: "", success: "Product updated successfully!" });
        fetchProducts();
        setTimeout(() => {
          setShowEditModal(false);
          setFormMsg({ error: "", success: "" });
        }, 1200);
      }
    } catch (err) {
      setFormMsg({ error: err.response?.data?.message || "Failed to update product.", success: "" });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product listing?")) return;
    try {
      await axiosInstance.delete(`/admin/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product.");
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      title: product.title || "",
      description: product.description || "",
      price: product.price || "",
      mrp: product.mrp || "",
      discount: product.discount || "0",
      category: product.category || "cleanser",
      inStock: product.inStock || "0",
    });
    setImageFile(null);
    setShowEditModal(true);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title?.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Product Listings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage catalog items, pricing, inventory & media uploads</p>
        </div>
        <Button onClick={() => {
          setFormData({ title: "", description: "", price: "", mrp: "", discount: "0", category: "cleanser", inStock: "10" });
          setImageFile(null);
          setShowAddModal(true);
        }}>
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Button>
      </div>

      {/* Control Bar */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Categories</option>
            <option value="cleanser">Cleanser</option>
            <option value="serum">Serum</option>
            <option value="moisturizer">Moisturizer</option>
            <option value="sunscreen">Sunscreen</option>
            <option value="toner">Toner</option>
          </select>
        </div>
      </Card>

      {/* Products Table */}
      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Product</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Category</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Price</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Stock</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/80 transition-colors text-sm">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.title} className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0" />
                        <div>
                          <div className="font-bold text-slate-900 line-clamp-1">{p.title}</div>
                          <div className="text-xs text-slate-500 line-clamp-1">{p.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="primary">{p.category}</Badge>
                    </td>
                    <td className="px-6 py-4 font-black text-slate-900">
                      RS. {p.price?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={p.inStock > 0 ? "success" : "danger"}>
                        {p.inStock > 0 ? `${p.inStock} in stock` : "Out of stock"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p._id)}
                          className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add Product Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Product Listing">
        {formMsg.error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl">{formMsg.error}</div>}
        {formMsg.success && <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl">{formMsg.success}</div>}

        <form onSubmit={handleCreateProduct} className="space-y-4">
          <Input label="Title" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Description</label>
            <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Price (RS)" type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            <Input label="MRP (RS)" type="number" required value={formData.mrp} onChange={(e) => setFormData({ ...formData, mrp: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="In Stock" type="number" required value={formData.inStock} onChange={(e) => setFormData({ ...formData, inStock: e.target.value })} />
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Category</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                <option value="cleanser">Cleanser</option>
                <option value="serum">Serum</option>
                <option value="moisturizer">Moisturizer</option>
                <option value="sunscreen">Sunscreen</option>
                <option value="toner">Toner</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Product Image</label>
            <input type="file" accept="image/*" required onChange={(e) => setImageFile(e.target.files[0])} className="w-full text-xs text-slate-500" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button type="submit" isLoading={formLoading}>Create Product</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Product Listing">
        {formMsg.error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl">{formMsg.error}</div>}
        {formMsg.success && <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl">{formMsg.success}</div>}

        <form onSubmit={handleUpdateProduct} className="space-y-4">
          <Input label="Title" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Description</label>
            <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Price (RS)" type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            <Input label="MRP (RS)" type="number" required value={formData.mrp} onChange={(e) => setFormData({ ...formData, mrp: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="In Stock" type="number" required value={formData.inStock} onChange={(e) => setFormData({ ...formData, inStock: e.target.value })} />
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Category</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                <option value="cleanser">Cleanser</option>
                <option value="serum">Serum</option>
                <option value="moisturizer">Moisturizer</option>
                <option value="sunscreen">Sunscreen</option>
                <option value="toner">Toner</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Replace Image (Optional)</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full text-xs text-slate-500" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowEditModal(false)}>Cancel</Button>
            <Button type="submit" isLoading={formLoading}>Save Changes</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
