import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import SliderItem from "./SliderItem";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../../assets/slider-loader.json";
import leftSticker from "../../assets/left-lottie.json";
import rightSticker from "../../assets/right-lottie.json";
import bgAnimation from "../../assets/bgAnimation.json";

const Slider = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch("/bannar.json")
      .then((res) => res.json())
      .then((data) => setBanners(data));
  }, []);

  if (banners.length === 0)
    return (
      <div className="h-[600px] flex items-center justify-center">
        <Lottie animationData={animationData} loop={true} className="w-48 h-48" />
      </div>
    );

  return (
    <div className="relative px-4 md:px-12 py-10 ">


      {/* ✅ Full Background Lottie */}
      {/* <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
        <Lottie animationData={bgAnimation} loop={true} className="absolute w-full h-full object-cover" />
      </div> */}


      {/* Left Side Lottie Animation */}
      <div className="hidden md:block absolute top-1/3 mt-30 left-4 w-38 h-78 opacity-80 pointer-events-none">
        <Lottie animationData={leftSticker} loop={true} />
      </div>

      {/* Right Side Lottie Animation */}
      <div className="hidden md:block absolute top-1/3 -translate-y-1/2 right-4 w-58 h-78 opacity-80 pointer-events-none">
        <Lottie animationData={rightSticker} loop={true} />
      </div>

      <Swiper
        effect="cards"
        grabCursor={true}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[EffectCards, Autoplay, Pagination]}
        className="max-w-md md:max-w-xl lg:max-w-3xl mx-auto"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <SliderItem banner={banner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
