import React, { useState } from "react";

function Auth() {
    const [isRegister, setIsRegister] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Please wait...");

        try {
            const endpoint = isRegister
                ? "/api/auth/register"
                : "/api/auth/login";

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Something went wrong");
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setMessage(
                isRegister
                    ? "Registration successful!"
                    : "Login successful!"
            );

            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 500);
        } catch (error) {
            console.error(error);
            setMessage("Unable to connect to server");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">

                <h1 className="text-2xl font-bold text-center mb-2">
                    Smart Expense Manager
                </h1>

                <p className="text-slate-400 text-center mb-6">
                    {isRegister ? "Create your account" : "Login to your account"}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {isRegister && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition"
                    >
                        {isRegister ? "Register" : "Login"}
                    </button>

                </form>

                {message && (
                    <p className="text-center text-sm text-emerald-400 mt-4">
                        {message}
                    </p>
                )}

                <button
                    type="button"
                    onClick={() => {
                        setIsRegister(!isRegister);
                        setMessage("");
                    }}
                    className="w-full mt-5 text-sm text-slate-300 hover:text-emerald-400"
                >
                    {isRegister
                        ? "Already have an account? Login"
                        : "Don't have an account? Register"}
                </button>

                <button
                    type="button"
                    onClick={() => {
                        window.location.href = "/";
                    }}
                    className="w-full mt-3 text-sm text-slate-500 hover:text-slate-300"
                >
                    Back to Home
                </button>

            </div>
        </div>
    );
}

export default Auth;