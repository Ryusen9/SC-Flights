import React from "react";
import heroBg from "../../../public/assets/Photos/Hero-BG.jpg";
import BlurText from "../Shared/BlurText";
import BookingInputs from "./BookingInputs";

const Hero = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* main hero */}
      <div
        className="h-[75vh] w-full relative flex flex-col items-center justify-center bg-fixed bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

        {/* Header */}
        <div className="text-center flex flex-col">
          <BlurText
            text="Fly Smarter, Travel Further"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-4xl mb-8 text-white font-rubik font-semibold"
          />
          <p className="text-sm text-white font-rubik">
            Compare fares, choose your seat, and take off — all in one place.
          </p>
        </div>

        {/* Search and inputs */}
        <div className="flex items-center justify-center mt-3 absolute top-[450px]">
          <BookingInputs />
        </div>
      </div>
    </div>
  );
};

export default Hero;
