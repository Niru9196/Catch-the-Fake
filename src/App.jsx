import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./view/Login";
import Register from "./view/RegisterForm";
import Home from "./view/Home";
import Header from "./view/Header";
import GameOverCard from "./view/GameOver";
import ImageCarousel from "./view/ImageCarousel";
import ProtectedRoute from "./services/ProtectedRoute";

import { AuthProvider } from "./context/AuthProvider";

const App = () => {
    return (
        <AuthProvider>
            <div className="relative h-screen overflow-hidden bg-gradient-to-r from-[#11022A] to-[#0A0C3E]">
                <div className="absolute w-[200px] h-[200px] bg-[#2B32D8] opacity-80 blur-[80px] z-[1] top-[50px] left-[-50px]" />
                <div className="absolute w-[200px] h-[200px] bg-[#2B32D8] opacity-80 blur-[80px] z-[1] top-[-50px] right-[300px]" />
                <div className="absolute w-[200px] h-[200px] bg-[#666BD8] opacity-80 blur-[80px] z-[1] bottom-[-50px] right-[-50px]" />

                <main className="w-screen z-[2] relative">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route
                            path="/login"
                            element={
                                <ProtectedRoute redirectIfAuth>
                                    <Login />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <ProtectedRoute redirectIfAuth>
                                    <Register />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/carousel"
                            element={
                                <ProtectedRoute>
                                    <ImageCarousel />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/game-over" element={<GameOverCard />} />
                    </Routes>
                </main>
            </div>
        </AuthProvider>
    );
};

export default App;
