import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/Firebase";
import Button from "../components/Button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await updateProfile(userCredential.user, {
            displayName: name,
        });

            console.log("Registered user:", userCredential.user);
            alert("Registration successful!");
        } catch (error) {
            console.error("Error registering:", error.message);
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-3xl p-6 sm:p-8 md:p-10 rounded-xl text-white border border-[#5760FF] backdrop-blur-xl bg-gradient-to-r from-[rgba(94,181,244,0.3)] to-[rgba(23,69,79,0.1)]"
            >
                <div className="relative flex items-center justify-center mb-6">
                    <motion.button
                        onClick={() => navigate("/")}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="absolute left-0 text-white hover:text-blue-400"
                        aria-label="Back to home"
                    >
                        <ArrowLeft className="w-6 h-6 text-4xl" />
                    </motion.button>
                    <h2 className="text-4xl font-bold text-center">
                        Register Yourself
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex w-1/2 flex-col">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-lg font-medium"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your name"
                            aria-label="Name"
                            className="w-full px-4 py-2 rounded-md text-white outline-none bg-[#F6F6F61C]"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-lg font-medium"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                aria-label="Email"
                                className="w-full px-4 py-2 rounded-md text-white outline-none bg-[#F6F6F61C]"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="phone"
                                className="block mb-2 text-lg font-medium"
                            >
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="Enter your phone number"
                                aria-label="Phone Number"
                                className="w-full px-4 py-2 rounded-md text-white outline-none bg-[#F6F6F61C]"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-lg font-medium"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter password"
                                aria-label="Password"
                                className="w-full px-4 py-2 rounded-md text-white outline-none bg-[#F6F6F61C]"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block mb-2 text-lg font-medium"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Confirm password"
                                aria-label="Confirm Password"
                                className="w-full px-4 py-2 rounded-md text-white outline-none bg-[#F6F6F61C]"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center pt-4">
                        <Button
                            text="Continue"
                            handleFunction={handleSubmit}
                            width="48"
                            size="small"
                        />
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Register;
