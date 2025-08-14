import { useEffect, useState } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TeamCard from "./TeamCard";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const TeamSlider = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("/teamData.json")
      .then((res) => res.json())
      .then((data) => setTeam(data));
  }, []);

  if (!team.length) {
    return (
      <div className="h-60 flex justify-center items-center">Loading...</div>
    );
  }

  return (
    <div className="py-18 px-4 md:px-12  ">
       <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-white mb-10">
  Meet Our Team Member
</h1>

        </div>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={9000}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay, Pagination]}
        className="max-w-6xl mx-auto"
      >
       
        {team.map((member, index) => (
          <SwiperSlide
            key={index}
            className="w-[250px] md:w-[300px] lg:w-[320px]"
          >
            <TeamCard member={member} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TeamSlider;