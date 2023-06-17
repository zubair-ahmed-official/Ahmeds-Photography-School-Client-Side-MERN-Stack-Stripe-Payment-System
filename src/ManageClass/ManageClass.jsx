import React, { useEffect, useState } from 'react';
import useAllClasses from '../hooks/useAllClasses';
import Swal from 'sweetalert2';
import Modal from "react-modal";
import ModalComponent from '../ModalComponent/ModalComponent';
import { Fade } from 'react-awesome-reveal';

const ManageClass = () => {
    const [allClass, refetch] = useAllClasses();


    const HandleApproveClass = (classes) => {
        fetch(`https://12th-assignment-server-side.vercel.app/class/status/${classes._id}`,
            {
                method: 'PATCH'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.modifiedCount) {
                    Swal.fire({
                        icon: 'success',
                        title: `${classes.cname} class has been approved`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    refetch();

                }
            })

    }

    const HandleDenyClass = (classes) => {
        fetch(`https://12th-assignment-server-side.vercel.app/class/deny/${classes._id}`,
            {
                method: 'PATCH'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    Swal.fire({
                        icon: 'success',
                        title: `${classes.cname} class has been Denied`,
                        showConfirmButton: false,
                        timer: 1500
                    })

                    refetch();
                }
            })

    }
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState("");

    // Function to open the modal
    const openModal = (data) => {
        setModalData(data);
        setModalIsOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        // Set the root element when the component mounts
        Modal.setAppElement("#root");
    }, []);

    return (
        <Fade duration={1500}><div className='text-center mt-6'>
            <p className='pt-3 text-2xl font-bold'>Number of Classes: {allClass.length}</p>
            <div className='grid grid-cols-3 ms-2 mt-10 gap-5 mb-6'>

                {allClass.map(ins =>
                    <div key={ins._id} className="card card-compact w-96 bg-slate-300 shadow-xl mb-8">
                        <figure><img src={ins.photo} style={{ height: '400px', width: '100%' }} alt="class" /></figure>
                        <div className="card-body">
                            <h2 className="card-title text-slate-800 font-bold text-2xl">{ins.cname}</h2>
                            <p className='text-left text-lg text-slate-600 font-semibold'>Instructor: {ins.instructor} </p>
                            <p className='text-left text-lg text-slate-600 font-semibold'>Instructor Email: {ins.instructor_email} </p>
                            <p className='text-left text-lg text-slate-600 font-semibold'>Price: {ins.price} BDT </p>
                            <p className='text-left text-lg text-slate-600 font-semibold'>Number of seats: {ins.seats} </p>
                            <p className='text-left text-lg text-slate-600 font-semibold'>Total Enrolled students: {ins?.enrolls || 0} </p>
                            <p className='text-left text-lg text-slate-600 font-semibold'>
                                Current Status: {ins.status === 'approved' ? <span className='text-green-600 font-bold'>Approved</span> : ins.status === 'denied' ? <span className='text-red-600 font-bold'>Denied</span> : <span className='text-orange-500 font-bold'>Pending</span>}
                            </p>
                            <div className='flex gap-3 mt-5'>
                                {ins.status === 'approved' || ins.status === 'denied' ? <><button className='btn btn-success btn-sm' style={{ color: 'grey' }} onClick={() => HandleApproveClass(ins)} disabled>Approve</button>
                                    <button className='btn btn-error btn-sm' onClick={() => HandleDenyClass(ins)} style={{ color: 'grey' }} disabled>Deny</button>
                                </> : <><button className='btn btn-success btn-sm' onClick={() => HandleApproveClass(ins)} >Approve</button>
                                    <button className='btn btn-error btn-sm' onClick={() => HandleDenyClass(ins)} >Deny</button>
                                </>}

                                {ins.status === 'denied' && <button className='btn btn-primary btn-sm' onClick={()=>openModal(ins)}>Send Feedback</button>}
                            </div>
                        </div>
                    </div>
                )}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    style={{
                        content: {
                            backgroundColor: "#1e293b",
                            borderRadius: "6px",
                            maxWidth: "600px",
                            height: "320px",
                            margin: "auto",
                            position: "relative"
                        },
                        overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.2)"
                        }
                    }}
                >
                    <ModalComponent ins={modalData} />

                    <div style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "transparent",
                        border: "none",
                        color: "red",
                        cursor: "pointer",
                        margin: '10px 20px '
                    }}>

                        <button onClick={closeModal} className='btn btn-circle btn-outline btn-sm' style={{color:'black', backgroundColor:'tomato'}}  ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                        </div>
                </Modal>
            </div>
            </div></Fade>
    );
};

export default ManageClass;