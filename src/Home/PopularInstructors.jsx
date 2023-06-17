import React from 'react';
import useInstructors from '../hooks/useInstructors';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PopularInstructors = () => {
    AOS.init();
    const [instructors] = useInstructors()
    return (
        <div className='text-center' data-aos="fade-up" data-aos-anchor-placement="top-center">
        <p className='pt-3 text-3xl md:text-3xl lg:text-3xl font-bold'>Popular Instructors</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   mt-10 mb-12 gap-10 lg:ms-20'>

            {instructors.slice(0,6).map(ins =>
                <div key={ins._id} className="card card-compact bg-violet-300 shadow-xl w-96 ">
                    <figure><img src={ins.image || ins.photoURL} style={{ height: '380px', width: '100%'}} alt="watches" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-slate-800 text-xl md:text-2xl lg:text-2xl font-bold">{ins.name}</h2>
                        <p className='text-left text-lg text-slate-600 font-semibold'>Email: {ins.email} </p>
                       
                    </div>
                </div>
            )}
        </div></div>
    );
};

export default PopularInstructors;