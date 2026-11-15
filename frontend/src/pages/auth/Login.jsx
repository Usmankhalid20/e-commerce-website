import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loader2, Sparkles, Lock, Mail } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isSigninIn, error } = useAuthStore();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({ email, password });
    if (result?.success) {
      const userRole = result.user?.role;
      if (["admin", "superadmin"].includes(userRole)) {
        navigate("/admin", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-slate-900 mb-2">
            <Sparkles className="w-7 h-7 text-blue-600" />
            <span>OneDrop</span>
          </Link>
          <h2 className="text-xl font-semibold text-slate-800">Welcome Back</h2>
          <p className="text-sm text-slate-500 mt-1">Log in to manage your account or store</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 text-red-700 text-sm font-medium rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-sm text-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSigninIn}
            className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50"
          >
            {isSigninIn ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <div className="text-center mt-6 pt-6 border-t border-slate-100">
          <p className="text-sm text-slate-600">
            Don't have an account?{" "}
            <Link to="/signup" state={{ from: location.state?.from }} className="text-blue-600 font-semibold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
