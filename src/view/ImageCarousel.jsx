import React, { useState, useEffect, useRef } from "react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    animate,
} from "framer-motion";
import questions from "../data/question.json";
import Card from "../components/ImageCard";
import star from "../assets/images/star.png";
import { Check, X, Mouse, ArrowDownUp } from "lucide-react";
import GameOverCard from "../view/GameOver";
import { saveGameScore, getGameScore } from "../services/gameService";
import { useLocation } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/Firebase";

const ImageCarousel = () => {
    const [current, setCurrent] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [hasDragged, setHasDragged] = useState(false);
    const [dragResult, setDragResult] = useState(null);
    const [direction, setDirection] = useState(1);
    const total = questions.length;
    const blockBackRef = useRef(false);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [userDragDirection, setUserDragDirection] = useState(null);

    const location = useLocation();
    const resetGameOverFlag = async () => {
        const user = auth.currentUser;
        if (!user) return;
        const docRef = doc(db, "gameScores", user.uid);
        await setDoc(docRef, { gameOver: false }, { merge: true });
    };

    useEffect(() => {
        const fetchGameState = async () => {
            if (location.state?.resetGame) {
                setIsGameOver(false);
                setScore(0);
                setCurrent(0);
                await resetGameOverFlag();
                return;
            }
            const data = await getGameScore();
            console.log("Loaded game state from Firestore:", data);
            if (data?.gameOver) {
                setIsGameOver(true);
                setScore(data.score);
            }
        };
        fetchGameState();
    }, [location.state]);

    useEffect(() => {
        if (isGameOver) {
            const saveFinalScore = async () => {
                try {
                    await saveGameScore(score);
                    console.log("Score saved at end of game:", score);
                } catch (err) {
                    console.error("Failed to save score:", err);
                }
            };

            saveFinalScore();
        }
    }, [isGameOver, score]);

    const getIndex = (offset) => (current + offset + total) % total;

    const variants = {
        enter: (direction) => ({
            rotateY: direction > 0 ? 90 : -90,
            opacity: 0,
            scale: 0.8,
            x: direction > 0 ? 100 : -100,
            position: "absolute",
            left: "50%",
            top: 0,
            translateX: "-50%",
        }),
        center: {
            rotateY: 0,
            opacity: 1,
            scale: 1,
            x: 0,
            position: "absolute",
            left: "50%",
            top: 0,
            translateX: "-50%",
            zIndex: 10,
        },
        exit: (direction) => ({
            rotateY: direction > 0 ? -90 : 90,
            opacity: 0,
            scale: 0.8,
            x: direction > 0 ? -100 : 100,
            position: "absolute",
            left: "50%",
            top: 0,
            translateX: "-50%",
        }),
    };

    const moveNext = async () => {
        const nextIndex = current + 1;
        if (nextIndex >= total) {
            setIsGameOver(true);
            await saveGameScore(score);
        } else {
            setDirection(1);
            setCurrent(nextIndex);
        }
    };

    useEffect(() => {
        if (!hasDragged) return;

        if (!blockBackRef.current) {
            window.history.pushState(null, null, window.location.href);
            blockBackRef.current = true;
        } else {
            window.history.replaceState(null, null, window.location.href);
        }

        const onPopState = () => {
            window.history.pushState(null, null, window.location.href);
        };

        window.addEventListener("popstate", onPopState);

        return () => {
            window.removeEventListener("popstate", onPopState);
        };
    }, [hasDragged]);

    const y = useMotionValue(0);
    const handleDragEndWithMove = (_, info) => {
        if (hasDragged) return;

        const offsetY = info.offset.y;

        let userThinksFraud = null;

        if (offsetY < -50) {
            userThinksFraud = true; // User dragged up = thinks fraud
            setUserDragDirection("up");
        } else if (offsetY > 50) {
            userThinksFraud = false; // User dragged down = thinks safe
            setUserDragDirection("down");
        }

        if (userThinksFraud !== null) {
            const actualIsFraud = questions[current].correctAnswer === false;
            const isCorrect = userThinksFraud === actualIsFraud;

            setHasDragged(true);
            setFeedback(isCorrect ? "✅ Correct!" : "❌ Incorrect!");
            setDragResult(isCorrect ? "correct" : "incorrect");

            if (isCorrect) {
                setScore((prev) => prev + 1);
            }

            animate(y, 0, { duration: 0.3, ease: "easeOut" });

            setTimeout(() => {
                moveNext();
                setFeedback(null);
                setHasDragged(false);
                setDragResult(null);
                setUserDragDirection(null);
            }, 1500);
        } else {
            animate(y, 0, { duration: 0.3, ease: "easeOut" });
        }
    };

    if (isGameOver) {
        return <GameOverCard score={score} />;
    }

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900 overflow-hidden px-4">
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 flex items-center gap-4 px-4 py-3 rounded-full z-20 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                <img
                    src={star}
                    alt="Score Icon"
                    className="w-16 h-16 rounded-full object-cover"
                    style={{
                        boxShadow: "0 0 10px 6px #FFF95EA1",
                    }}
                />
                <div className="text-3xl font-bold text-[#66FCF1] ml-3.5">
                    {score}{" "}
                </div>
            </div>

            <AnimatePresence>
                {dragResult && (
                    <motion.div
                        key="blur"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className={`absolute inset-0 z-0 backdrop-blur-sm ${
                            dragResult === "correct"
                                ? "bg-green-400/20"
                                : "bg-red-400/20"
                        }`}
                    />
                )}
            </AnimatePresence>

            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(60)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full opacity-40 animate-pulse drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                        style={{
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>

            <div
                className="relative z-10 w-[600px] h-[300px]"
                style={{ perspective: "1200px" }}
            >
                {[-1, 1].map((offset) => {
                    const index = getIndex(offset);
                    const style = {
                        position: "absolute",
                        top: 0,
                        left: "38%",
                        width: "260px",
                        height: "100%",
                        transform: `translateX(${
                            offset * 220
                        }px) translateZ(-200px) scale(0.8)`,
                        opacity: 0.6,
                        zIndex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "1rem",
                    };

                    return (
                        <div key={index} style={style}>
                            <Card>
                                <p className="text-white text-center text-lg font-semibold">
                                    {questions[index].statement}
                                </p>
                            </Card>
                        </div>
                    );
                })}

                <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                        key={current}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        drag="y"
                        dragConstraints={{ top: -120, bottom: 120 }}
                        dragElastic={0.6}
                        dragTransition={{
                            bounceStiffness: 100,
                            bounceDamping: 10,
                        }}
                        style={{ y }}
                        onDragStart={() => setHasInteracted(true)}
                        onDragEnd={handleDragEndWithMove}
                        whileDrag={{
                            scale: 1.05,
                            boxShadow: "0 0 25px rgba(255, 255, 255, 0.4)",
                        }}
                        className="w-64 cursor-grab active:cursor-grabbing rounded-xl p-4 relative mx-auto"
                    >
                        <Card>
                            <p className="text-white text-center text-lg font-semibold">
                                {questions[current].statement}
                            </p>
                        </Card>

                        {dragResult && (
                            <motion.div
                                key="feedback-icon"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3 }}
                                className={`absolute bottom-0 ml-10 left-1/2 transform -translate-x-1/2 p-2 rounded-full shadow-lg border-white border-1 ${
                                    userDragDirection === "down"
                                        ? "bg-green-600/60"
                                        : "bg-red-600/60"
                                }`}
                                style={{ width: 48, height: 48 }}
                            >
                                {userDragDirection === "down" ? (
                                    <Check className="w-8 h-8 text-white" />
                                ) : (
                                    <X className="w-8 h-8 text-white" />
                                )}
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {feedback && (
                    <motion.div
                        key="feedback-text"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute bottom-[10%] ml-12 left-1/2 transform -translate-x-1/2 text-center text-white text-xl font-bold z-20 px-4 py-2 rounded-full border border-white ${
                            userDragDirection === "down"
                                ? "bg-green-600/60"
                                : "bg-red-600/60"
                        }`}
                    >
                        {userDragDirection === "up"
                            ? "It’s a fraud message"
                            : "It’s a safe message"}
                    </motion.div>
                )}
            </AnimatePresence>

            {!hasInteracted ? (
                <div className="flex absolute bottom-8 ml-12 left-1/2 transform -translate-x-1/2 text-center text-white text-md font-medium z-20 px-6 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-blue-500 shadow-md select-none">
                    <Mouse className="w-12 h-12" />
                    <div>
                        <p>Drag “Up” the fraud message and</p>
                        <p>Drag “Down” the Safe message</p>
                    </div>
                </div>
            ) : (
                <div
                    className="flex absolute ml-12 bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white text-md font-medium z-10 px-6 py-3 rounded-lg select-none pointer-events-none border border-blue-500"
                    style={{
                        opacity: 0.15,
                        userSelect: "none",
                        fontStyle: "italic",
                        textShadow: "0 0 8px rgba(255, 255, 255, 0.1)",
                    }}
                >
                    <ArrowDownUp className="w-8 h-6" />
                    <p>
                        Swipe up for the fraud message and swipe down for the
                        safe message
                    </p>
                </div>
            )}
        </div>
    );
};

export default ImageCarousel;
