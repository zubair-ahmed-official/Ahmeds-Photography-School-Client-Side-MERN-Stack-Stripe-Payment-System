import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { AuthContext } from "../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";

const SignUp = () => {

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const onSubmit = (data,event) => {

        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photoURL = form.photoURL.value;
        console.log(name, email, password, photoURL);
        setError('');
        const updateUserData = (user, name) => {
            updateProfile(user, {
                displayName: name,
                photoURL: photoURL
            })
                .then(() => console.log("Profile updated"))
                .catch(err => console.error(err))
        }
        setLoading(true)
        createUser(data.email, data.password)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserData(result.user, name);
                setLoading(false)
                const from = location?.state?.from?.pathname || '/';

                const newUser = { name, email, photoURL }
                fetch('https://12th-assignment-server-side.vercel.app/users',
                    {
                        method: 'post',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(newUser)
                    })

                Swal.fire({
                    icon: 'success',
                    title: 'Signed Up Successfully',
                    showConfirmButton: false,
                    timer: 1500

                })
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error.message);
                setError(error.message);
            })
    };
    return (
        <>
            <div className="hero mt-10 ">
                <div className="text-slate-300">
                    <div className="card shadow-2xl bg-slate-900 p-5" style={{ width: '600px' }}>
                        <div className="">
                            <h1 className="text-3xl font-bold text-center">Sign up
                            </h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">

                                <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered text-slate-300 bg-slate-700" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>

                            <div className="form-control mt-4">

                                <input type="email"  {...register("email", { required: true })} name="email" placeholder="Email" className="input input-bordered text-slate-300 bg-slate-700" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>

                            <div className="form-control mt-4 ">

                                <input type="password"  {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /((?=.*[A-Z])(?=.*[!@#$&*]))/
                                })} placeholder="Password" className="input input-bordered text-slate-300 bg-slate-700" />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}

                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Capital and one special character.</p>}
                            </div>
                            <div className="form-control mt-4">

                                <input type="password"  {...register("confirm_password", {
                                    required: true,
                                    validate: (value) => value === watch('password')
                                })} placeholder="Confirm Password" className="input input-bordered text-slate-300 bg-slate-700" />

                                {/* {errors.confirm_password?.type === 'required' && <p className="text-red-600">Confirm Password is required</p>} */}
                                {errors.confirm_password && <p className="text-red-600">Password doesn't match</p>}

                            </div>
                            <div className="form-control mt-4 ">
                                <input type="text"  {...register("photoURL", { required: false })} placeholder="Photo URL" className="input input-bordered text-slate-300 bg-slate-700" />
                                
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn btn-outline btn-primary" type="submit" value="Sign Up" />
                            </div>
                            <p style={{ color: 'red' }}>{error}</p>
                        </form>
                        <p className="text-center"><small>Already have an account? <Link to="/Login" className="font-bold">Login</Link></small></p>

                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;