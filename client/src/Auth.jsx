import React, { useState } from "react";

import {
    Wallet,
    Mail,
    Lock,
    User,
    Eye,
    EyeOff,
    ArrowLeft,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";

// Backend API
const API_URL = "http://localhost:5000";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [showPassword, setShowPassword] =
        useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ==========================================
    // LOGIN / REGISTER
    // ==========================================

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const endpoint = isLogin
                ? `${API_URL}/api/auth/login`
                : `${API_URL}/api/auth/register`;

            const body = isLogin
                ? {
                    email: email.trim(),
                    password,
                }
                : {
                    name: name.trim(),
                    email: email.trim(),
                    password,
                };

            console.log("Sending authentication request:", {
                endpoint,
                mode: isLogin ? "login" : "register",
            });

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            // Read response safely
            const contentType =
                response.headers.get("content-type") || "";

            let data;

            if (contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();

                console.error(
                    "Server returned non-JSON response:",
                    text
                );

                throw new Error(
                    `Server returned an unexpected response (${response.status}).`
                );
            }

            console.log(
                "Authentication response:",
                data
            );

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    data.error ||
                    "Authentication failed"
                );
            }

            // Save token
            if (data.token) {
                localStorage.setItem(
                    "token",
                    data.token
                );
            }

            // Save user
            if (data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            }

            // Go to dashboard
            window.history.pushState(
                {},
                "",
                "/dashboard"
            );

            window.dispatchEvent(
                new PopStateEvent("popstate")
            );

            window.scrollTo({
                top: 0,
                behavior: "auto",
            });

        } catch (err) {
            console.error(
                "Authentication error:",
                err
            );

            setError(
                err.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // BACK TO HOME
    // ==========================================

    const goBack = () => {
        window.history.pushState(
            {},
            "",
            "/"
        );

        window.dispatchEvent(
            new PopStateEvent("popstate")
        );

        window.scrollTo({
            top: 0,
            behavior: "auto",
        });
    };

    // ==========================================
    // SWITCH LOGIN / REGISTER
    // ==========================================

    const switchMode = () => {
        setIsLogin(!isLogin);

        setName("");
        setEmail("");
        setPassword("");
        setError("");
        setShowPassword(false);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#050B0A] text-white">

            {/* ==========================================
                BACKGROUND DECORATION
            ========================================== */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">

                <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.06] blur-[120px]" />

                <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-teal-500/[0.05] blur-[120px]" />

                <div className="absolute bottom-[-250px] left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-400/[0.03] blur-[120px]" />

            </div>

            {/* ==========================================
                NAVBAR
            ========================================== */}

            <nav className="relative z-20 border-b border-white/[0.06] bg-[#050B0A]/80 backdrop-blur-xl">

                <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-10">

                    {/* LOGO */}

                    <button
                        onClick={goBack}
                        className="group flex items-center gap-2.5"
                    >

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/10 transition duration-300 group-hover:shadow-emerald-500/20">

                            <Wallet className="h-[18px] w-[18px] text-[#04100D]" />

                        </div>

                        <div className="text-left leading-none">

                            <p className="text-[15px] font-bold tracking-[-0.01em] text-white">
                                SmartSpend
                            </p>

                            <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.16em] text-[#6F8580]">
                                Expense Manager
                            </p>

                        </div>

                    </button>

                    {/* BACK */}

                    <button
                        onClick={goBack}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#8EA39E] transition hover:bg-white/[0.04] hover:text-white"
                    >

                        <ArrowLeft className="h-3.5 w-3.5" />

                        <span className="hidden sm:inline">
                            Back to home
                        </span>

                    </button>

                </div>

            </nav>

            {/* ==========================================
                MAIN CONTENT
            ========================================== */}

            <main className="relative z-10 flex min-h-[calc(100vh-68px)] items-center justify-center px-5 py-10 sm:px-8">

                <div className="grid w-full max-w-[1100px] items-center gap-12 lg:grid-cols-[1fr_440px]">

                    {/* ==================================
                        LEFT INFORMATION
                    ================================== */}

                    <div className="hidden lg:block">

                        <div className="max-w-xl">

                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-3.5 py-2">

                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />

                                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-300">
                                    Personal Finance
                                </span>

                            </div>

                            <h1 className="text-[46px] font-bold leading-[1.08] tracking-[-0.035em] text-white">

                                Your money.

                                <br />

                                <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    Your control.
                                </span>

                            </h1>

                            <p className="mt-6 max-w-lg text-[15px] leading-7 text-[#879B96]">

                                Track expenses, monitor your budget,
                                and understand your spending habits
                                from one simple financial dashboard.

                            </p>

                            {/* BENEFITS */}

                            <div className="mt-9 space-y-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/10 bg-emerald-400/[0.06]">

                                        <TrendingUp className="h-4 w-4 text-emerald-400" />

                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold text-white">
                                            Track your spending
                                        </p>

                                        <p className="mt-0.5 text-xs text-[#687F79]">
                                            Keep every expense organized.
                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/10 bg-emerald-400/[0.06]">

                                        <ShieldCheck className="h-4 w-4 text-emerald-400" />

                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold text-white">
                                            Stay within budget
                                        </p>

                                        <p className="mt-0.5 text-xs text-[#687F79]">
                                            Make informed financial decisions.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* ==================================
                        AUTH CARD
                    ================================== */}

                    <div className="w-full">

                        {/* CARD */}

                        <div className="rounded-[24px] border border-white/[0.08] bg-[#0B1513]/95 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">

                            {/* CARD HEADER */}

                            <div className="mb-7">

                                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/[0.07]">

                                    <Wallet className="h-5 w-5 text-emerald-400" />

                                </div>

                                <h2 className="text-2xl font-bold tracking-tight text-white">

                                    {isLogin
                                        ? "Welcome back"
                                        : "Create your account"}

                                </h2>

                                <p className="mt-2 text-sm leading-6 text-[#778B86]">

                                    {isLogin
                                        ? "Sign in to continue to your dashboard."
                                        : "Create an account and start managing your expenses."}

                                </p>

                            </div>

                            {/* ERROR */}

                            {error && (

                                <div className="mb-5 rounded-xl border border-red-400/10 bg-red-400/[0.06] px-4 py-3">

                                    <p className="text-xs leading-5 text-red-300">
                                        {error}
                                    </p>

                                </div>

                            )}

                            {/* FORM */}

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >

                                {/* NAME */}

                                {!isLogin && (

                                    <div>

                                        <label className="mb-2 block text-xs font-semibold text-[#B8C8C4]">
                                            Full name
                                        </label>

                                        <div className="relative">

                                            <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#536963]" />

                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(event) =>
                                                    setName(
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="Enter your name"
                                                required
                                                autoComplete="name"
                                                className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#07100E] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-[#4F625D] hover:border-white/[0.12] focus:border-emerald-400/40 focus:bg-[#091411] focus:ring-2 focus:ring-emerald-400/[0.06]"
                                            />

                                        </div>

                                    </div>

                                )}

                                {/* EMAIL */}

                                <div>

                                    <label className="mb-2 block text-xs font-semibold text-[#B8C8C4]">
                                        Email address
                                    </label>

                                    <div className="relative">

                                        <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#536963]" />

                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(event) =>
                                                setEmail(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="you@example.com"
                                            required
                                            autoComplete="email"
                                            className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#07100E] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-[#4F625D] hover:border-white/[0.12] focus:border-emerald-400/40 focus:bg-[#091411] focus:ring-2 focus:ring-emerald-400/[0.06]"
                                        />

                                    </div>

                                </div>

                                {/* PASSWORD */}

                                <div>

                                    <div className="mb-2 flex items-center justify-between">

                                        <label className="text-xs font-semibold text-[#B8C8C4]">
                                            Password
                                        </label>

                                    </div>

                                    <div className="relative">

                                        <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#536963]" />

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={password}
                                            onChange={(event) =>
                                                setPassword(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Enter your password"
                                            required
                                            autoComplete={
                                                isLogin
                                                    ? "current-password"
                                                    : "new-password"
                                            }
                                            className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#07100E] pl-10 pr-12 text-sm text-white outline-none transition placeholder:text-[#4F625D] hover:border-white/[0.12] focus:border-emerald-400/40 focus:bg-[#091411] focus:ring-2 focus:ring-emerald-400/[0.06]"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#536963] transition hover:text-[#A9BBB6]"
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >

                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}

                                        </button>

                                    </div>

                                </div>

                                {/* SUBMIT */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 text-sm font-bold text-[#04100D] shadow-lg shadow-emerald-500/10 transition duration-300 hover:-translate-y-[1px] hover:from-emerald-300 hover:to-emerald-400 hover:shadow-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                                >

                                    {loading
                                        ? "Please wait..."
                                        : isLogin
                                            ? "Sign in"
                                            : "Create account"}

                                </button>

                            </form>

                            {/* SWITCH */}

                            <div className="mt-6 border-t border-white/[0.06] pt-6 text-center">

                                <p className="text-xs text-[#71847F]">

                                    {isLogin
                                        ? "Don't have an account?"
                                        : "Already have an account?"}

                                    <button
                                        type="button"
                                        onClick={switchMode}
                                        className="ml-1.5 font-semibold text-emerald-400 transition hover:text-emerald-300"
                                    >

                                        {isLogin
                                            ? "Create one"
                                            : "Sign in"}

                                    </button>

                                </p>

                            </div>

                            {/* SECURITY NOTE */}

                            <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-[#52635F]">

                                <ShieldCheck className="h-3.5 w-3.5" />

                                <span>
                                    Your financial data stays protected
                                </span>

                            </div>

                        </div>

                        {/* MOBILE BRAND */}

                        <div className="mt-6 text-center lg:hidden">

                            <p className="text-xs text-[#52635F]">
                                SmartSpend · Expense Manager
                            </p>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
};

export default Auth;