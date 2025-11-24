import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Hero = () => {
  const slides = [
    "/slider1.png",
    "/slider2.jpg",
    "/slider3.jpg",
    "/slider4.jpg",
    "/slider5.jpg",
  ];

  return (
    <div className="relative w-full h-[80vh]">
      {/* Slider */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              className="w-full h-full object-cover z-0"
              alt={`slide-${i}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hero text */}
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white text-center px-6 z-10 pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-bold fade-in">
          Shop Smarter with ShopEase
        </h1>
        <p className="text-lg md:text-xl mt-3 fade-in">
          Premium Products • Best Prices • Fast Delivery
        </p>
        <button className="px-10 mt-4 py-3 bg-black text-white rounded-xl font-semibold shadow transition duration-300 cursor-pointer hover:scale-105 hover:bg-white hover:text-black fade-in pointer-events-auto">
            Shop Now
          </button>
      </div>
    </div>
  );
};

export default Hero;
