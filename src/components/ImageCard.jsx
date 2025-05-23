import React, { useMemo } from "react";

const colors = [
  "bg-blue-500 text-white",
  "bg-red-400 text-white",
  "bg-green-400 text-white",
  "bg-yellow-400 text-black",
  "bg-purple-500 text-white",
  "bg-pink-400 text-white",
  "bg-indigo-500 text-white",
  "bg-teal-400 text-black",
];

const Card = ({ children }) => {
  // useMemo so color stays stable per render
  const randomColor = useMemo(() => {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }, []);

  return (
    <div className={`${randomColor} p-11 rounded-lg shadow-md mx-auto h-80 w-80 flex justify-center items-center`}>
      {children}
    </div>
  );
};

export default Card;
