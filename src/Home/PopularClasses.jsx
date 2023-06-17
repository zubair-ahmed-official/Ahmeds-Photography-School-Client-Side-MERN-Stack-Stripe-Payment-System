import React from 'react';
import useApprovedClasses from '../hooks/useApprovedClasses';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PopularClasses = () => {
    AOS.init();
    const [approvedClass] = useApprovedClasses()
    const sortedData = approvedClass.sort((a, b) => (b.enrolls) - (a.enrolls));
    return (
        <div className="text-center mt-6" data-aos="zoom-in-up">
            <p className="pt-3 text-3xl md:text-3xl lg:text-3xl font-bold">Popular Classes</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   mt-10 mb-12 gap-10 lg:ms-20" >
                {sortedData.slice(0, 6).map((ins) => (
                    <div key={ins._id} className="card card-compact bg-slate-300 shadow-xl w-96 ">
                        <figure>
                            <img src={ins.photo} style={{ height: '400px', width: '100%' }} alt="class" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-slate-800 text-xl md:text-2xl lg:text-2xl font-bold">{ins.cname}</h2>
                            <p className="text-left text-lg text-slate-600 font-semibold">Instructor: {ins.instructor}</p>
                            <p className="text-left text-lg text-slate-600 font-semibold">Instructor Email: {ins.instructor_email}</p>
                            <p className="text-left text-lg text-slate-600 font-semibold">Price: {ins.price} BDT</p>
                            <p className="text-left text-lg text-slate-600 font-semibold">Available seats: {ins.seats}</p>
                            <p className="text-left text-lg text-slate-600 font-semibold">Total Enrolled students: {ins?.enrolls || 0}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default PopularClasses;