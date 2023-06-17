import React from 'react';
import useInstructors from '../hooks/useInstructors';

const Instructors = () => {
    const [instructors] = useInstructors()
    return (
        <div className='text-center'>
        <p className='pt-3 text-2xl font-bold'>Number of instructors: {instructors.length}</p>
        <div className='grid grid-cols-3 ms-16 mt-5'>

            {instructors.map(ins =>
                <div key={ins._id} className="card card-compact w-96 bg-slate-300 shadow-xl mb-8">
                    <figure><img src={ins.image || ins.photoURL} style={{ height: '400px', width: '100%' }} alt="watches" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-slate-800 font-bold">{ins.name}</h2>
                        <p className='text-left text-lg text-slate-600 font-semibold'>Email: {ins.email} </p>
                        {/* <p className='text-left text-lg text-slate-600 font-semibold'>Classes:</p>
                        {ins.classes? ins.classes.map(cl=>
                        <li key={ins._id} className='text-left  text-slate-600 font-semibold'>{cl} </li>): ""} */}
                       
                    </div>
                </div>
            )}
        </div></div>
    );
};

export default Instructors;