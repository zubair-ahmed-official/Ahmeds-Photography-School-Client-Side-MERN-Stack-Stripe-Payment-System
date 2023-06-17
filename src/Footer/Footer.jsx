import React from 'react';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
const Footer = () => {
    return (
        <div className='mt-10'>
            <footer className="footer p-10 bg-base-200 text-base-content">
                <div>
                    <img height="36px" width="45px" src="https://i.ibb.co/hcygSCQ/423-4236395-clipart-camera-photo-session-camera-photography-logo-png.png"></img>
                    <a className=" normal-case text-xl font-bold text-slate-500" href="/">Ahmed's Photography School</a>
                </div>
                <div>
                    <span className="footer-title">Services</span>
                    <a className="link link-hover">Professional </a>
                    <a className="link link-hover">Wildlife</a>
                    <a className="link link-hover">Natural</a>
                    <a className="link link-hover">Advertisement</a>
                </div>
                
                <div>
                    <span className="footer-title">Contact Us</span>
                    <a className="link link-hover">ahmedsphoto650@gmail.com</a>
                    <a className="link link-hover">01748596321</a>
                   <div className='flex gap-2'>
                   <a href='#'><FaGoogle /></a><a href='#'> <FaFacebook/></a><a href='#'><FaTwitter/></a>
                   </div>
                </div>
                <div>
                    <span className="footer-title">Address</span>
                    <p>Mirpur 10, Dhaka, Bangladesh</p>
                </div>

            </footer>
            <div className="footer footer-center p-4 bg-base-300 text-base-content">
                <div>
                    <p>Copyright © 2023 - All right reserved by Ahmed's Photography School</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;