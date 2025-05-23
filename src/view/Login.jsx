import React from "react";
import Button from "../components/Button";

const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Add login logic
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
            <div className="relative z-10 p-10 px-32 rounded-xl text-white border border-[#5760FF] backdrop-blur-xl bg-gradient-to-r from-[rgba(94,181,244,0.3)] to-[rgba(23,69,79,0.1)]">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-1 text-lg font-medium"
                        >
                            Email ID
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-2 rounded-md text-white outline-none bg-[#F6F6F61C]"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-1 text-lg font-medium"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-2 rounded-md text-white outline-none bg-[#F6F6F61C]"
                        />
                    </div>
                    <p>Forgot your password?</p>
                    <Button
                        text="Next"
                        handleFucntion={handleSubmit}
                        width="52"
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;
