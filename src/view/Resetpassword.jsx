import React, { useState } from "react";
import { resetPassword } from "../services/authService";

const Resetpassword = ({ setIsResetOpen }) => {
    const [resetEmail, setResetEmail] = useState("");
    const [resetMessage, setResetMessage] = useState(null);
    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setResetMessage(null);
        const { success, error } = await resetPassword(resetEmail);
        if (error) {
            setResetMessage(error);
        } else {
            setResetMessage("Password reset email sent! Check your inbox.");
        }
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-[#0f172a] p-8 rounded-xl w-96 text-white border border-[#5760FF] backdrop-blur-xl">
                <h3 className="text-xl font-semibold mb-4">Reset Password</h3>
                <form onSubmit={handlePasswordReset} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-md text-white outline-none bg-[#F6F6F61C]"
                    />
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            className="text-gray-400 hover:text-white"
                            onClick={() => {
                                setIsResetOpen(false);
                                setResetMessage(null);
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Send Reset Email
                        </button>
                    </div>
                    {resetMessage && (
                        <p
                            className={`mt-2 ${
                                resetMessage.includes("sent")
                                    ? "text-green-400"
                                    : "text-red-400"
                            }`}
                        >
                            {resetMessage}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Resetpassword;
