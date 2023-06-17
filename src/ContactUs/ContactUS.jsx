// import React from 'react';
import { useContext } from 'react'
import './ContactUS.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthContext } from '../Providers/AuthProvider';

const ContactUS = () => {
    const {user} = useContext(AuthContext)
    AOS.init();
    return (
        
        <div  className='Contact' data-aos="zoom-in-up">
        <h2 id='contact' className='text-3xl text-center font-bold'>Contact Us</h2>
        <div className='contactFlex'>
        <form action="https://formsubmit.co/saad03261@gmail.com" method="POST">
            <p>Your Name:</p>
            <input className='inputContact'  type="text" name="name" placeholder=" Name" defaultValue={user?.displayName} required /><br />
            <p>Your Email:</p>
            <input className='inputContact'  type="email" name="email" placeholder=" E-Mail" defaultValue={user?.email} required /><br />
            <p>Your Message:</p>
            <textarea className='inputTextArea'  placeholder=" Your message" name="message" required></textarea><br />
            <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
        <div>
            <img className='contactImg' src='https://i.ibb.co/BVQ0tFX/theregisti-HSXIp58y-Py-I-unsplash.jpg'></img>
        </div>
        </div>
    </div>
    );
};

export default ContactUS;