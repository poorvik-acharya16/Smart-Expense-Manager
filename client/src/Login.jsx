import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Wallet,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
} from "lucide-react";

const Login = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Invalid email or password.");
                return;
            }

            // Save authentication data
            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            if (data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            }

            // Open dashboard after successful login
            navigate("/dashboard");

        } catch (err) {
            setError(
                "Unable to connect to the server. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-8">

            <div className="w-full max-w-md">

                {/* LOGO */}
                <div className="text-center mb-8">

                    <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <Wallet className="w-8 h-8 text-emerald-400" />
                    </div>

                    <h1 className="text-3xl font-bold mt-5">
                        Smart Expense Manager
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Manage your money smarter
                    </p>

                </div>

                {/* LOGIN CARD */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-xl">

                    <div className="mb-7">
                        <h2 className="text-2xl font-bold">
                            Welcome Back 👋
                        </h2>

                        <p className="text-sm text-slate-400 mt-2">
                            Login to continue to your dashboard.
                        </p>
                    </div>

                    {/* ERROR */}
                    {error && (
                        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* EMAIL */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email Address
                            </label>

                            <div className="relative">

                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition"
                                />

                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>

                            </div>
                        </div>

                        {/* LOGIN BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-bold transition"
                        >
                            {loading ? "Logging in..." : "Login"}

                            {!loading && (
                                <ArrowRight className="w-5 h-5" />
                            )}
                        </button>

                    </form>

                    {/* REGISTER */}
                    <div className="text-center mt-7 pt-6 border-t border-slate-800">

                        <p className="text-sm text-slate-400">
                            Don't have an account?
                        </p>

                        <Link
                            to="/register"
                            className="inline-block mt-2 text-emerald-400 hover:text-emerald-300 font-semibold transition"
                        >
                            Create an account
                        </Link>

                    </div>

                </div>

                {/* BACK TO HOME */}
                <div className="text-center mt-6">
                    <Link
                        to="/"
                        className="text-sm text-slate-500 hover:text-slate-300 transition"
                    >
                        ← Back to Home
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default Login;
