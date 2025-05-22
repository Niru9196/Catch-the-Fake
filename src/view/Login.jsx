import React from 'react';
import techCircle from '../assets/images/highlightedWheel.png';

const Login = () => {
  return (
    <div className="flex justify-center md:items-end min-h-screen text-white font-sans ">
      <div className="relative flex items-center justify-center sm:w-[38rem] sm:h-[38rem] 2xl:w-[50rem] 2xl:h-[50rem]">
        <img
          src={techCircle}
          alt="Tech Circle"
          className="h-full object-contain "
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-[40px] md:text-5xl font-semibold leading-tight">
            CATCH THE FAKE
          </h1>

          <p className="mt-2 text-lg text-[#C3C3C3]">Beware of Fraud Messages!</p>
          <p className="text-base mb-6 text-[#C3C3C3]">Spot the fraud and collect points.</p>

          <button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: 'spring',
              mass: 1,
              stiffness: 100,
              damping: 15,
            }}
            className="text-white font-semibold py-2 px-8 rounded-xl text-lg w-64"
            style={{
              background: 'linear-gradient(to right, #5760FF, #000D1F)',
            }}
          >
            Log In
          </button>

          <p className="mt-4 text-sm text-[#FFFFFF]">
            Don’t have log in?{' '}
            <a href="#" className="text-[#38B0FF] underline font-medium">
              Register yourself
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
