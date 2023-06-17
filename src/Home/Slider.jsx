import React from 'react';
import './Slider.css'
const Slider = () => {
    return (
        <div className="carousel w-full sliderHeight" >
            <div id="slide1" className="carousel-item relative w-full sliderHeight" >
                <img src="https://i.ibb.co/tZ0tqc6/fidel-fernando-Gu-H4-xt-Knn-M-unsplash.jpg" className="w-full" />
                <div class="carousel-caption">
                    <h3>Nature Photography</h3>
                    <p>We serve appropriate guideline about photography of natures</p>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full sliderHeight">
                <img src="https://i.ibb.co/SnZ0XXM/nils-nedel-ONp-GBpns3cs-unsplash.jpg" className="w-full" />
                <div class="carousel-caption">
                    <h3>Capturing moments that last a lifetime.</h3>
                    <p>Conveying the harmonious and captivating nature of the world.</p>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full sliderHeight">
                <img src="https://i.ibb.co/0Z7d4Bg/william-thomas-ny6t-O4-It-OEY-unsplash.jpg" className="w-full" />
                <div class="carousel-caption">
                    <h3>Discovering the extraordinary in the ordinary.</h3>
                    <p> Exploring diverse viewpoints that tell countless narratives.</p>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full sliderHeight">
                <img src="https://i.ibb.co/fpHbDX6/patrick-pahlke-G7wg-Kn7j-Rs-unsplash.jpg" className="w-full" />
                <div class="carousel-caption">
                    <h3>The world through my lens: a visual symphony.</h3>
                    <p>Revealing the hidden beauty within everyday scenes.</p>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Slider;