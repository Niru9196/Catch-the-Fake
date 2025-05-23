import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // You can use any icon library
import Button from "../components/Button";
import { loginUser } from "../services/authService";
import Resetpassword from "./Resetpassword";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isResetOpen, setIsResetOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { user, error } = await loginUser(email, password);
        if (error) {
            setError(error);
        } else {
            console.log("Logged in user:", user);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 p-10 md:w-[35%] rounded-xl text-white border border-[#5760FF] backdrop-blur-xl bg-gradient-to-r from-[rgba(94,181,244,0.3)] to-[rgba(23,69,79,0.1)]"
            >
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate("/")}
                        className="text-white hover:text-blue-400 transition"
                        aria-label="Back to Home"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold text-white text-center flex-1">
                        Login
                    </h2>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 max-w-[70%] flex justify-center flex-col mx-auto"
                >
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-2 rounded-md text-white outline-none bg-[#F6F6F61C]"
                        />
                    </div>

                    <p
                        onClick={() => setIsResetOpen(true)}
                        className="text-blue-400 cursor-pointer hover:underline"
                    >
                        Forgot your password?
                    </p>

                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <div className="flex justify-center items-center mt-5">
                        <Button
                            text="Next"
                            handleFucntion={handleSubmit}
                            width="48"
                            size="small"
                        />
                    </div>
                </form>
            </motion.div>

            <AnimatePresence>
                {isResetOpen && (
                    <motion.div
                        key="reset-modal"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    >
                        <Resetpassword setIsResetOpen={setIsResetOpen} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Login;
