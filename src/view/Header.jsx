import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import {logout} from "../services/authService"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const sidebarVariants = {
        hidden: { x: "100%" },
        visible: { x: 0 },
    };

    const isHome = location.pathname === "/";
    const isImageCarousel = location.pathname === "/carousel";

    return (
        <>
            <header
                className={`fixed top-3 left-3 right-3 ${
                    isImageCarousel ? "z-15" : "z-50"
                } backdrop-blur-md border border-[#5760FF]/20 text-white flex justify-between items-center px-6 py-3 shadow-lg rounded-xl bg-[linear-gradient(to_right,_rgba(94,181,244,0.3),_rgba(23,69,79,0.1))]`}
            >
                {!isHome && (
                    <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold select-none">
                        CATCH THE FAKE
                    </h1>
                )}

                <button
                    className="p-2 rounded-md hover:bg-white/10 transition ml-auto"
                    onClick={() => setIsOpen(true)}
                >
                    <Menu className="w-8 h-8" />
                </button>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.aside
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={sidebarVariants}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                            className="fixed top-0 right-0 w-64 h-full bg-[#121212] text-white shadow-lg z-50 p-6"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-semibold">Menu</h2>
                                <button onClick={() => setIsOpen(false)}>
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <ul className="space-y-4">
                                <li className="hover:text-blue-400 cursor-pointer"  className="hover:text-blue-400 cursor-pointer"
  onClick={async () => {
    await logout();
    // Optional: redirect after logout
    // navigate("/login");
  }}>
                                    Logout
                                </li>
                                
                            </ul>
                        </motion.aside>

                        <motion.div
                            onClick={() => setIsOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-40"
                        />
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
