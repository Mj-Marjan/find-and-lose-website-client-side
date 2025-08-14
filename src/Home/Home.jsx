import React from 'react';
import Slider from '../Components/Slider/Slider';
import LatestData from '../Components/LatestItems/LatestData';
import HowItWorks from '../Pages/HowItWork';
import Testimonials from '../Pages/Testimonials/Testimonials';
import FaqSection from '../Pages/FaqSection';
import TeamSlider from '../Pages/Team/TeamSlider';
import { Helmet } from 'react-helmet';

const Home = () => {
    return ( 
        <div className='bg-gradient-to-t from-blue-100 to-blue-50'>
            <Helmet>
                <title>Home - WhereIsIt</title>
            </Helmet>
            <Slider></Slider>
            <LatestData></LatestData>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
            <FaqSection></FaqSection>
            <TeamSlider></TeamSlider>
        </div>
    );
};

export default Home;