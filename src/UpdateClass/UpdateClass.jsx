import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Providers/AuthProvider';
import axios from 'axios';
import { Bounce } from 'react-awesome-reveal';
import { useLoaderData } from 'react-router-dom';

const UpdateClass = () => {

    const loader = useLoaderData();
    const { _id, cname, price, photo, instructor, instructor_email, seats, enrolls } = loader;

    const { user } = useContext(AuthContext);

    const image_token = import.meta.env.VITE_IMAGE;
    const [selectedImage, setSelectedImage] = useState(null);
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_token}`

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const HandleAddClass = async (event) => {
        event.preventDefault();

        if (selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage);

            try {
                const response = await axios.post(image_hosting_url, formData);

                console.log(response.data);

                const cname = event.target.cname.value;
                const price = parseInt(event.target.price.value);
                const photo = response.data.data.display_url;
                const instructor = event.target.instructor.value;
                const instructor_email = event.target.instructor_email.value;
                const seats = parseInt(event.target.seats.value);
                const enrolls = parseInt(event.target.enrolls.value);


                const newWatch = { cname, price, photo, instructor, instructor_email, seats, enrolls }
                console.log(newWatch);

                fetch(`https://12th-assignment-server-side.vercel.app/class/${_id}`,
                    {
                        method: 'put',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(newWatch)
                    })
                    .then(res => {
                        if (res.status === 400) {
                            console.log('Already exists')
                            Swal.fire({
                                icon: 'error',
                                title: 'Class name already exists!',
                               
                              })
                        }
                        else {
                            Swal.fire({
                                icon: 'success',
                                title: 'Updated Successfully',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    }

                    )
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <Bounce duration={1200}> <div className='hero mt-10 '>
            <div className="card shadow-2xl bg-slate-800 p-5" style={{ width: '600px' }}>
                <h2 className='m-5 font-bold text-2xl text-center' >Update Class</h2>
                <form onSubmit={HandleAddClass}>
                    <div className="form-control">
                        <span className='font-bold'>Class Name: </span>
                        <input name="cname" type="text" placeholder="" className="input input-bordered bg-slate-700" 
                        defaultValue={cname} required />
                    </div><br></br>

                    <div className="form-control">
                        <span className='font-bold'>Price: </span>
                        <input name="price" type="number" placeholder="  (BDT)" className="input input-bordered bg-slate-700" defaultValue={price} required />
                    </div><br></br>

                    <div className="form-control">
                        <span className='font-bold'>Image: </span>
                        <input type="file" className="file-input file-input-bordered bg-slate-700" accept="image/*" onChange={handleImageSelect} required/>
                    </div><br></br>

                    <div className="form-control">
                        <span className='font-bold'>Instructor: </span>
                        <input name="instructor" type="text" placeholder="  " className="input input-bordered bg-slate-700" defaultValue={user.displayName} readOnly />
                    </div><br></br>

                    <div className="form-control">
                        <span className='font-bold'>Instructor Email: </span>
                        <input name="instructor_email" type="text" placeholder="  " className="input input-bordered bg-slate-700" defaultValue={user.email} readOnly />
                    </div><br></br>

                    <div className="form-control">
                        <span className='font-bold'>Available Seats: </span>
                        <input name="seats" type="number" placeholder="  " className="input input-bordered bg-slate-700" defaultValue={seats} required />
                    </div><br></br>

                    <div className="form-control" style={{ display: "none" }}>
                        <span className='font-bold'>Enrolls: </span>
                        <input name="enrolls" type="number" placeholder="  " className="input input-bordered bg-slate-700" defaultValue={enrolls} required readonly />
                    </div>

                    <div className="form-control mt-6">
                        <input className="btn btn-outline btn-primary" type="submit" value="Update Class" />
                    </div>
                </form>
            </div>
        </div></Bounce >
    );
};

export default UpdateClass;