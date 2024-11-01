import React from 'react';
// import "./Slider.scss";
import {sliderImages} from '../utilis/images';

const Slider = () => {
  return (
    <div className = "hero-slider">
      <div className='hero-slider-item'>
        <img src = {sliderImages[1]} alt = "" />
      </div>
    </div>
  )
}

export default Slider;