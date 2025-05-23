import React from "react";
import Button from "../components/Button";

const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
            <div className="relative z-10 w-full max-w-xl p-10 rounded-xl text-white border border-[#5760FF] backdrop-blur-xl bg-gradient-to-r from-[rgba(94,181,244,0.3)] to-[rgba(23,69,79,0.1)]">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Register
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="w-1/2">
                        <label
                            htmlFor="name"
                            className="block mb-1 text-lg font-medium"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            required
                            className="w-full px-4 py-2 rounded-md text-white outline-none bg-[#F6F6F61C]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                                htmlFor="phone"
                                className="block mb-1 text-lg font-medium"
                            >
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Enter your phone number"
                                required
                                className="w-full px-4 py-2 rounded-md text-white outline-none bg-[#F6F6F61C]"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-1 text-lg font-medium"
                            >
                                Enter Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter password"
                                required
                                className="w-full px-4 py-2 rounded-md text-white outline-none bg-[#F6F6F61C]"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block mb-1 text-lg font-medium"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm password"
                                required
                                className="w-full px-4 py-2 rounded-md text-white outline-none bg-[#F6F6F61C]"
                            />
                        </div>
                    </div>

                    {/* <button
            type="submit"
            className="w-full bg-[#5760FF] hover:bg-[#3f47d6] transition-colors py-2 rounded-md font-semibold"
          >
            Register
          </button> */}

                    <Button
                        text="Continue"
                        handleFunction={handleSubmit}
                        width="52"
                    />
                </form>
            </div>
        </div>
    );
};

export default Register;
