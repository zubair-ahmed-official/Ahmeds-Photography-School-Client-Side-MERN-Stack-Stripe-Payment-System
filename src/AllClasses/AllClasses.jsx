import React from 'react';
import useApprovedClasses from '../hooks/useApprovedClasses';
import { FaCheckCircle } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
const AllClasses = () => {
    const [approvedClass] = useApprovedClasses()
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const HandleCart = (approvedClass) => {
        if (user && user.email) {
            const orderItem = { id: approvedClass.id, cname: approvedClass.cname, price: approvedClass.price, photo: approvedClass.photo, instructor: approvedClass.instructor, enrolls: approvedClass.enrolls, seats: approvedClass.seats, email: user.email, status: 'pending' }
           
            fetch('https://12th-assignment-server-side.vercel.app/selectClass',
                {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(orderItem)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Class selected Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else if(!user){
            const from = location?.state?.from?.pathname || '/Login';
            console.log('cant login');
            navigate(from, { replace: true });
        }
    }

    return (
        <div className='text-center mt-6'>
            <p className='pt-3 text-2xl font-bold'>Number of Classes: {approvedClass.length}</p>
            <div className='grid grid-cols-3 ms-16 mt-10 gap-24 mb-8'>

                {approvedClass.map(ins =>
                    parseInt(ins.seats) === 0 ?
                        <div key={ins._id} className="card card-compact w-96 bg-red-400 shadow-xl mb-8">
                            <figure><img src={ins.photo} style={{ height: '400px', width: '100%' }} alt="class" /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-slate-800 font-bold text-2xl">{ins.cname}</h2>
                                <p className='text-left text-lg text-slate-600 font-semibold'>Instructor: {ins.instructor} </p>
                                <p className='text-left text-lg text-slate-600 font-semibold'>Instructor Email: {ins.instructor_email} </p>
                                <p className='text-left text-lg text-slate-600 font-semibold'>Price: {ins.price} BDT </p>
                                <p className='text-left text-lg text-slate-600 font-semibold'>Available seats: {ins.seats} </p>
                                <p className='text-left text-lg text-slate-600 font-semibold'>Total Enrolled students: {ins?.enrolls || 0} </p>

                                {ins.status === 'approved' ? <p className='text-left text-lg text-green-600 font-bold flex items-center'><FaCheckCircle /> &nbsp; Approved By Admin </p> : ""}
                                <button className='mt-5 btn btn-primary btn-sm' style={{ color: 'black' }} disabled>Not Available</button>
                            </div>
                        </div>
                        : <div key={ins._id} className="card card-compact w-96 bg-slate-300 shadow-xl mb-8">
                            <figure><img src={ins.photo} style={{ height: '400px', width: '100%' }} alt="class" /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-slate-800 font-bold text-2xl">{ins.cname}</h2>
                                <p className='text-left text-lg text-slate-600 font-semibold'>Instructor: {ins.instructor} </p>
                                <p className='text-left text-lg text-slate-600 font-semibold'>Instructor Email: {ins.instructor_email} </p>
                                <p className='text-left text-lg text-slate-600 font-semibold'>Price: {ins.price} BDT </p>
                                <p className='text-left text-lg text-slate-600 font-semibold'>Available seats: {ins.seats} </p>
                                <p className='text-left text-lg text-slate-600 font-semibold'>Total Enrolled students: {ins?.enrolls || 0} </p>

                                {ins.status === 'approved' ? <p className='text-left text-lg text-green-600 font-bold flex items-center'><FaCheckCircle /> &nbsp; Approved By Admin </p> : ""}
                                <button onClick={() => HandleCart(ins)} className='mt-5 btn btn-primary btn-sm' >Select Class</button>
                            </div>
                        </div>

                )}
            </div></div>
    );
};

export default AllClasses;