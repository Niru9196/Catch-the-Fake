import React from "react";
import techCircle from "../assets/images/highlightedWheel.png";
import Button from "../components/Button";

const Home = () => {
    return (
        <div className="flex justify-center md:items-end min-h-screen text-white ">
            <div className="relative flex items-center justify-center sm:w-[40rem] sm:h-[40rem] 2xl:w-[50rem] 2xl:h-[50rem]">
                <img
                    src={techCircle}
                    alt="Tech Circle"
                    className="h-full object-contain "
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 space-y-14">
                    <div>
                        <h2 className="text-[40px] md:text-5xl font-extrabold leading-tight">
                            CATCH THE FAKE
                        </h2>

                        <p className="mt-2 text-base text-[#C3C3C3] leading-7 tracking-wider">
                            Beware of Fraud Messages!
                        </p>
                        <p className="text-base mb-6 text-[#C3C3C3] tracking-wider">
                            Spot the fraud and collect points.
                        </p>
                    </div>
                    <div className="flex flex-col space-y-6">
                        <div>
                            <Button text="Log In" width="72" />
                        </div>

                        <div>
                            <p className="mt-2 text-sm text-[#FFFFFF]">
                                Don’t have log in?{" "}
                                <a
                                    href="#"
                                    className="text-[#38B0FF] underline font-medium ml-1 tracking-wide"
                                >
                                    Register yourself
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
