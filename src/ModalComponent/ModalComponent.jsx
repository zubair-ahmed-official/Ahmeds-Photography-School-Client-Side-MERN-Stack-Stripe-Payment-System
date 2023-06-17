import React from 'react';
import Swal from 'sweetalert2';
import Modal from "react-modal";

const ModalComponent = ({ ins }) => {

    Modal.setAppElement("#root");
    ///class/feedback/
    const HandleSendFeedback = (classes) => {
        event.preventDefault();
        const feedback = event.target.feedback.value;
        const adminFeedback = { feedback }
        console.log(adminFeedback);
        console.log(`${classes._id}`);
        
        fetch(`https://12th-assignment-server-side.vercel.app/class/feedback/${classes._id}`,
            {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(adminFeedback)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.modifiedCount) {
                    Swal.fire({
                        icon: 'success',
                        title: `Feedback sent to ${classes.cname}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                  

                }
            })

    }
    return (
        <div style={{ backgroundColor: "#1e293b", padding: "20px" }}>
            <h2 className='text-slate-200 font-bold'>Write Feedback to {ins.cname}</h2>
            <form onSubmit={() => HandleSendFeedback(ins)} >
             
                <textarea className="mt-3 textarea textarea-primary" style={{ width: '520px', height: '170px' }} name='feedback' placeholder="Write here...."></textarea>
                <button className='btn btn-primary btn-sm' style={{
                    position: "absolute",
                    bottom: "15px",
                    right: "30px",
                    marginBottom: "5px"
                }} >Submit</button>
            </form>
        </div>
    );
};

export default ModalComponent;