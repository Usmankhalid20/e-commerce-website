import React from "react";
import { Sparkles, ShieldCheck, Leaf, Heart, Users, Award } from "lucide-react";
import Card from "../components/ui/Card";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-100">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Our Story & Science</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Pure Botanical Formulations for Healthy, Radiant Skin
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          At OneDrop, we believe that true skincare excellence comes from combining clinical dermatological research with sustainably harvested organic botanicals.
        </p>
      </div>

      {/* Brand Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-8 text-center space-y-4">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
            <Leaf className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">100% Organic Extracts</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Sourced ethically from certified organic farms, ensuring peak nutrient potency without harsh synthetic fillers.
          </p>
        </Card>

        <Card className="p-8 text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Dermatologist Tested</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Every serum and moisturizer undergoes rigorous clinical safety testing to suit even the most sensitive skin types.
          </p>
        </Card>

        <Card className="p-8 text-center space-y-4">
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
            <Award className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Ethical & Cruelty Free</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            We are committed to eco-friendly recyclable packaging and 100% cruelty-free formulation standards.
          </p>
        </Card>
      </div>
    </div>
  );
}
