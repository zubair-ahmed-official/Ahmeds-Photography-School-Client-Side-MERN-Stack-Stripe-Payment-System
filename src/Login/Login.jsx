import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Providers/AuthProvider';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';
import { app } from '../../firebase.config';

const Login = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app);
    const GoogleProvider = new GoogleAuthProvider(auth);

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const location = useLocation();
    const { loggedUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data, event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        setError('');
        const from = location?.state?.from?.pathname || '/';

        setLoading(true)
        loggedUser(email, password)
            .then(result => {
                const loggedIn = result.user;
                console.log(loggedIn);
                setError('');
                setLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error.message);
                setError(error.message);
            }
            )
    }
    const [signedIn, setUser] = useState(null);
    const handleGoogleLogin = () => {
        const from = location?.state?.from?.pathname || '/';
        signInWithPopup(auth, GoogleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setError('');
                setUser(loggedInUser);
                
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, photoURL:loggedInUser.photoURL }

                fetch('https://12th-assignment-server-side.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.error(err.message);
                setError(err.message);
            })
    }

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="hero mt-10 ">
            <div className="text-slate-300">
                <div className="card shadow-2xl bg-slate-900 p-5" style={{ width: '600px' }}>
                    <div className="">
                        <h1 className="text-3xl font-bold text-center ">Login
                        </h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                        <div className="form-control mt-4">

                            <input type="email"  {...register("email", { required: true })} name="email" placeholder="Email" className="input input-bordered text-slate-300 bg-slate-700" />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>

                        <div className="form-control mt-4 ">

                            <input type={showPassword ? 'text' : 'password'}
                                {...register("password", {
                                    required: true,

                                })} placeholder="Password" className="input input-bordered text-slate-300 bg-slate-700" />
                            <i className='ms-2 mt-2' onClick={togglePasswordVisibility}>
                                {showPassword ? <div className='flex items-center'>  <FaEyeSlash /> &nbsp; Hide password </div> : <div className='flex items-center'><FaEye />&nbsp; Unhide password</div>}
                            </i>
                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}

                        </div>
                        <p style={{ color: 'red' }}>{error}</p>
                        <div className="form-control mt-6">
                            <input className="btn btn-outline btn-primary" type="submit" value="Login" />
                        </div>
                    </form>

                    <p className="text-center"><small>Create a new account <Link to="/SignUp" className="font-bold">SignUp</Link></small></p>
                </div>
                <p className='text-center'><button onClick={handleGoogleLogin} className="mt-3  btn btn-success"> <FaGoogle /> Login with Google </button></p>
            </div>
        </div>
    );
};

export default Login;