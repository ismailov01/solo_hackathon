import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Carousel.css'

const MyCarousel = () => {
    return (
        <div>            
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100  carousel"
                        src="https://api.papajohns.kg//images/banners/ade8cc7c13a7e643d122555cb3546027.webp"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100  carousel"
                        src="https://api.papajohns.kg//images/banners/a081ce55fd9627671868fe3e83c4f512.webp"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100  carousel"
                        src="https://api.papajohns.kg//images/banners/2febf22e316a09c6a57a547a44f997b3.webp"
                        alt="Third slide"
                    />
                </Carousel.Item>
             


            </Carousel>
        </div>
    );
};

export default MyCarousel;