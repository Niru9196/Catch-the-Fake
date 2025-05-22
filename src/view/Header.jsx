import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarVariants = {
    hidden: { x: '100%' },   // off-screen right
    visible: { x: 0 },       // fully visible
  };

  return (
    <>
      {/* Glassmorphism Header */}
<header
  className="fixed top-3 left-3 right-3 z-50 backdrop-blur-md border border-[#5760FF]/20 text-white flex justify-end items-center px-6 py-3 shadow-lg rounded-xl bg-[linear-gradient(to_right,_rgba(94,181,244,0.3),_rgba(23,69,79,0.1))]"
>
  {/* Hamburger icon on the right */}
  <button
    className="p-2 rounded-md hover:bg-white/10 transition"
    onClick={() => setIsOpen(true)}
  >
    <Menu className="w-8 h-8" />
  </button>
</header>


      {/* Sidebar and overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Sidebar sliding from right */}
            <motion.aside
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={sidebarVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-64 h-full bg-[#121212] text-white shadow-lg z-50 p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <ul className="space-y-4">
                <li className="hover:text-blue-400 cursor-pointer">Home</li>
                <li className="hover:text-blue-400 cursor-pointer">Leaderboard</li>
                <li className="hover:text-blue-400 cursor-pointer">About</li>
                <li className="hover:text-blue-400 cursor-pointer">Contact</li>
              </ul>
            </motion.aside>

            {/* Overlay for click outside */}
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
