import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/Firebase";
import Button from "../components/Button";
import { Share2 } from "lucide-react";
import techCircle from "../assets/images/highlightedWheel.png";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);

    const auth = getAuth();
    const currentUserName = auth.currentUser?.displayName;
    useEffect(() => {
        const fetchData = async () => {
            const q = query(
                collection(db, "gameScores"),
                orderBy("score", "desc")
            );
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc, index) => {
                const docData = doc.data();
                return {
                    ...docData,
                    rank: index + 1,
                    isUser: docData.name === currentUserName,
                };
            });
            setLeaderboardData(data);
        };

        fetchData();
    }, []);

    const navigate = useNavigate();
    const handlePlayAgain = () => {
        navigate("/carousel", { state: { resetGame: true } });
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden">
            <img
                src={techCircle}
                alt="Background"
                className="absolute inset-0 h-full w-full object-contain pointer-events-none select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f2c] via-[#0f172a] to-[#0a0f2c] opacity-90 z-0" />

            <div className="relative z-10 p-8 rounded-2xl border border-[#5760FF] bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] shadow-xl flex flex-col items-center w-[95%] max-w-md space-y-6">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
                    CATCH THE FAKE
                </h1>

                <div className="w-full max-w-lg bg-[#0E1841] rounded-2xl p-6 shadow-inner">
                    <h2 className="text-xl font-semibold text-center mb-4 text-white">
                        LEADERBOARD
                    </h2>
                    <div className="max-h-72 overflow-y-auto pr-1 custom-scrollbar space-y-2">
                        {leaderboardData.map((entry, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-between px-4 py-2 rounded-lg ${
                                    entry.isUser
                                        ? "bg-[#0056FF] text-white font-semibold"
                                        : "bg-[#1A2550] text-gray-300"
                                }`}
                            >
                                <div className="w-6 text-center text-sm">
                                    {entry.rank}
                                </div>
                                <div className="flex items-center gap-3 flex-1 pl-4">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                                            entry.isUser
                                                ? "bg-white text-[#0056FF]"
                                                : "bg-[#2a3a75] text-white"
                                        }`}
                                    >
                                        {entry.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="truncate text-sm">
                                        {entry.name}
                                    </span>
                                </div>
                                <div className="text-sm pr-1 whitespace-nowrap">
                                    {entry.score} points
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-4">
                    <Button
                        text="Share"
                        width="44"
                        size="small"
                        className="bg-transparent border border-[#5760FF] hover:bg-[#0056FF]/20"
                    >
                        <Share2 className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                        handleFunction={handlePlayAgain}
                        text="Play Again"
                        width="44"
                        size="small"
                        className="bg-[#0056FF] hover:bg-[#0041cc]"
                    />
                </div>
            </div>
        </div>
    );
}
