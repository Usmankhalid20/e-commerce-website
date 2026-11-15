import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page = 1, pages = 1, onPageChange }) {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-6 border-t border-slate-200">
      <p className="text-xs text-slate-500 font-medium">
        Page <span className="font-semibold text-slate-900">{page}</span> of{" "}
        <span className="font-semibold text-slate-900">{pages}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="p-2 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="px-3 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-lg border border-blue-200">
          {page}
        </span>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pages}
          className="p-2 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
