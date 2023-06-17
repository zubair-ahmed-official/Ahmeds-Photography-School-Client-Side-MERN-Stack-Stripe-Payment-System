import React from 'react';
import useMyClasses from '../hooks/useMyClasses';
import { Bounce, Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';

const MyClass = () => {
    const [myClass] = useMyClasses();
    return (
        <Fade duration={1500}><div className='text-center'>
        <p className='pt-3 text-2xl font-bold'>Number of Classes: {myClass.length}</p>
        <div className='grid grid-cols-3 ms-2 mt-10 gap-5 mb-6'>

            {myClass.map(ins =>
                <div key={ins._id} className="card card-compact w-96 bg-slate-300 shadow-xl mb-8">
                    <figure><img src={ins.photo } style={{ height: '400px', width: '100%' }} alt="class" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-slate-800 font-bold text-2xl">{ins.cname}</h2>
                        <p className='text-left text-lg text-slate-600 font-semibold'>Price: {ins.price} BDT </p>
                        <p className='text-left text-lg text-slate-600 font-semibold'>Number of seats: {ins.seats} </p>
                        <p className='text-left text-lg text-slate-600 font-semibold'>Total Enrolled students: {ins?.enrolls || 0} </p>
                        <p className='text-left text-lg text-slate-600 font-semibold'>
                            Status: {ins.status === 'approved' ?  <span className='text-green-600 font-bold'>Approved</span>  : ins.status === 'denied' ?  <span className='text-red-600 font-bold'>Denied</span>  : <span className='text-orange-500 font-bold'>Pending</span>}
                        </p>
                        {ins?.feedback ? <p className='text-left text-lg text-slate-600 font-semibold'>Admins Feedback: {ins?.feedback } </p>: ""}
                        <Link className='mt-5 btn btn-primary btn-sm' to={`/Dashboard/UpdateClass/${ins._id}`}><button >Update</button></Link>
                    </div>
                </div>
            )}
        </div>
        </div></Fade>
    );
};

export default MyClass;