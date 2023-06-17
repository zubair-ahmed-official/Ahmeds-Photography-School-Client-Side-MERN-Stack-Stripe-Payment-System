// import React from 'react';

import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <div style={{position: 'absolute', top:'25px', left: '680px', textAlign: 'center'}}>
            <h2 className="text-slate-800 font-semibold">Page Not Found</h2>
            <Link to='/'><button className="btn btn-success"><b>Back to Home Page</b></button></Link>
            </div>
            <img src="https://i.ibb.co/RgWmh0n/6325254.jpg" className="" style={{height: '850px', width:'100%'}}></img>
        </div>
    );
};

export default NotFound;