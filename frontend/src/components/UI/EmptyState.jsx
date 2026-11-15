import React from "react";
import { PackageOpen } from "lucide-react";

export default function EmptyState({
  icon: Icon = PackageOpen,
  title = "No Data Found",
  description = "There are no records to display at this time.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-2xl border border-slate-100 shadow-xs">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}
