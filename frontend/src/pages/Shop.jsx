import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Filter, ShoppingBag, ArrowUpDown, RefreshCw } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { useCartStore } from "../store/useCartStore";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";
import EmptyState from "../components/ui/EmptyState";
import Pagination from "../components/ui/Pagination";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, fetchProducts, isLoading } = useProductStore();
  const { addToCart } = useCartStore();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [sort, setSort] = useState(searchParams.get("sort") || "-createdAt");
  const [page, setPage] = useState(parseInt(searchParams.get("page"), 10) || 1);

  const categories = [
    { label: "All Categories", value: "all" },
    { label: "Cleansers", value: "cleanser" },
    { label: "Serums", value: "serum" },
    { label: "Moisturizers", value: "moisturizer" },
    { label: "Sunscreen", value: "sunscreen" },
    { label: "Toners", value: "toner" },
    { label: "Masks", value: "mask" },
  ];

  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (category !== "all") params.category = category;
    if (sort) params.sort = sort;
    if (page > 1) params.page = page;

    setSearchParams(params);
    fetchProducts(params);
  }, [search, category, sort, page, fetchProducts, setSearchParams]);

  const handleResetFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("-createdAt");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Skincare Catalog</h1>
        <p className="text-slate-500 text-sm mt-1">Discover dermatologically tested botanical skincare for your daily routine</p>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-4 sm:p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products by title or ingredient..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              >
                <option value="-createdAt">Newest Arrivals</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="title">Title: A - Z</option>
              </select>
            </div>

            {/* Reset Button */}
            {(search || category !== "all" || sort !== "-createdAt") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="text-slate-500 hover:text-slate-800"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i} className="p-4 space-y-4">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </Card>
          ))}
        </div>
      ) : products.length === 0 ? (
        <EmptyState
          title="No Products Match Your Filter"
          description="Try adjusting your search criteria or resetting filters to browse our full catalog."
          action={
            <Button variant="outline" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product._id} hover className="flex flex-col overflow-hidden">
              <Link to={`/product/${product._id}`} className="aspect-square bg-slate-100 relative overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.discount > 0 && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                    -{product.discount}%
                  </span>
                )}
                {product.inStock <= 0 && (
                  <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </Link>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    {product.category}
                  </span>
                  <Link to={`/product/${product._id}`}>
                    <h3 className="text-base font-bold text-slate-900 mt-2 hover:text-blue-600 transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-base font-extrabold text-slate-900">
                      RS. {product.price?.toLocaleString()}
                    </span>
                    {product.mrp > product.price && (
                      <span className="text-xs text-slate-400 line-through ml-2">
                        RS. {product.mrp?.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    disabled={product.inStock <= 0}
                    onClick={() => addToCart(product, 1)}
                    className="gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
