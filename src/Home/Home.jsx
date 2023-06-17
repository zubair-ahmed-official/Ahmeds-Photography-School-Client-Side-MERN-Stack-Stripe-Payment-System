
import React from 'react';
import Slider from './Slider';
import PopularClasses from './PopularClasses';
import PopularInstructors from './PopularInstructors';
import ContactUS from '../ContactUs/ContactUS';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <ContactUS></ContactUS>
        </div>
    );
};

export default Home;