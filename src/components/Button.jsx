import React from "react";

const Button = ({ text, handleFunction, width }) => {
    return (
        <div>
            <button
                className={`relative rounded-md border border-white text-white font-semibold px-8 py-3 text-lg w-${
                    width || "auto"
                } bg-transparent overflow-visible`}
            >
                {text}
                <span className="absolute -top-[0.15rem] -left-[0.15rem] w-20 h-4 rounded-tl-lg pointer-events-none border-t-2 border-l-2 border-white"></span>
                <span className="absolute -top-[0.3rem] -left-[0.3rem] w-22 h-6 pointer-events-none border-t-2 border-t-[#666BD8] border-l-2 border-l-[#666BD8] rounded-t-md rounded-l-md shadow-[0_0_10px_#3036C8"></span>
                <span className="absolute -top-[0.15rem] -right-[0.15rem] w-20 h-4 rounded-tr-lg pointer-events-none border-t-2 border-r-2 border-white"></span>
                <span className="absolute -top-[0.3rem] -right-[0.3rem] w-22 h-6 rounded-tr-lg pointer-events-none border-t-2 border-t-[#666BD8] border-r-2 border-r-[#666BD8] rounded-t-md rounded-r-md"></span>
                <span className="absolute -bottom-[0.15rem] -left-[0.15rem] w-20 h-4 rounded-bl-lg pointer-events-none border-b-2 border-l-2 border-white"></span>
                <span className="absolute -bottom-[0.3rem] -left-[0.3rem] w-22 h-6 rounded-bl-lg pointer-events-none border-b-2 border-b-[#666BD8] border-l-2 border-l-[#666BD8] rounded-b-md rounded-l-md"></span>
                <span className="absolute -bottom-[0.15rem] -right-[0.15rem] w-20 h-4 rounded-br-lg pointer-events-none border-b-2 border-r-2 border-white"></span>
                <span className="absolute -bottom-[0.3rem] -right-[0.3rem] w-22 h-6 rounded-br-lg pointer-events-none  border-b-[#666BD8] border-r-[#666BD8] border-r-2 border-b-2 rounded-b-md rounded-r-md"></span>
            </button>
        </div>
    );
};

export default Button;
