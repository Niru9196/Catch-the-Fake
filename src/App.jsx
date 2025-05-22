import React from 'react';
import blurredImage from './assets/images/blurredWheel.png';
import Login from './view/Login';
import Header from './view/Header';

const App = () => {
  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-r from-[#11022A] to-[#0A0C3E]">
      
      <div className="absolute w-[200px] h-[200px] bg-[#2B32D8] opacity-80 blur-[80px] z-[1] top-[50px] left-[-50px]" />
      <div className="absolute w-[200px] h-[200px] bg-[#2B32D8] opacity-80 blur-[80px] z-[1] top-[-50px] right-[300px]" />
      <div className="absolute w-[200px] h-[200px] bg-[#666BD8] opacity-80 blur-[80px] z-[1] bottom-[-50px] right-[-50px]" />
      
      <div className="absolute inset-0 flex items-center justify-center z-[2]">
        <img
          src={blurredImage}
          alt="Centered"
          className="hidden md:block h-auto object-contain"
        />
      </div>
      <main className='w-screen'>
        <Header />
        <Login />
      </main>
    </div>
  );
};

export default App;
