import React from "react";
import star from "../assets/images/star.png";
import bgImage from "../assets/images/backLight.png";

const GameOverCard = ({ score }) => {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-[#0f172a] bg-cover bg-center relative"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] text-white rounded-xl border border-[#5760FF] shadow-lg w-80 space-y-4 z-10">
                <h1 className="text-4xl font-extrabold">GAME</h1>
                <h1 className="text-4xl font-extrabold">OVER</h1>
                <p className="text-lg mt-2">You have scored</p>

                <div className="flex items-center gap-4 mt-2 px-4 py-3 rounded-lg bg-[#00042F]">
                    <img
                        src={star}
                        alt="Score Icon"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="text-3xl font-bold text-[#66FCF1]">
                        {score} Points
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameOverCard;
