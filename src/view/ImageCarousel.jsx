import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import questions from "../data/question.json";
import Card from "../components/ImageCard";
import star from "../assets/images/star.png";

const ImageCarousel = () => {
    const [current, setCurrent] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [hasDragged, setHasDragged] = useState(false);
    const [dragResult, setDragResult] = useState(null);
    const [direction, setDirection] = useState(1);
    const total = questions.length;
    const blockBackRef = useRef(false);

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

    const moveNext = () => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % total);
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

    const handleDragEndWithMove = (_, info) => {
        if (hasDragged) return;

        const offsetY = info.offset.y;
        const result =
            offsetY < -50 ? "correct" : offsetY > 50 ? "incorrect" : null;

        if (result) {
            setHasDragged(true);
            setFeedback(result === "correct" ? "✅ Correct!" : "❌ Incorrect!");
            setDragResult(result);

            setTimeout(() => {
                moveNext();
                setFeedback(null);
                setHasDragged(false);
                setDragResult(null);
            }, 1500);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 flex items-center gap-4 px-4 py-3 rounded-full z-20 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                <img
                    src={star}
                    alt="Score Icon"
                    className="w-16 h-16 rounded-full object-cover"
                    style={{
                        boxShadow: "0 0 10px 6px #FFF95EA1",
                    }}
                />
                <div className="text-3xl font-bold text-[#66FCF1]">Points</div>
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
                                ? "bg-green-500/30"
                                : "bg-red-500/30"
                        }`}
                    />
                )}
            </AnimatePresence>

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
                        transform: `
                            translateX(${offset * 220}px)
                            translateZ(-200px)
                            scale(0.8)
                            `,
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
                        onDragEnd={handleDragEndWithMove}
                        whileDrag={{
                            scale: 1.05,
                            boxShadow: "0 0 25px rgba(255, 255, 255, 0.4)",
                        }}
                        className={`w-64 cursor-grab active:cursor-grabbing rounded-xl p-4`}
                    >
                        <Card>
                            <p className="text-white text-center text-lg font-semibold">
                                {questions[current].statement}
                            </p>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {feedback && (
                    <motion.div
                        key="feedback"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 text-white text-xl font-bold z-10"
                    >
                        {feedback}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ImageCarousel;
