import React, { useState } from 'react';
import Slider from "react-slick";
import {
    amazonBanner,
    amazonAddBanner1,
    amazonAddBanner2,
    amazonAddBanner3,
    amazonAddBanner4,
} from '../../assets/images/index';

const Banner = () => {
    const [dotActive, setDotActive] = useState(0);
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: (prev, next) => {
            setDotActive(next)
        },
        appendDots: dots => (
            <div
              style={{
                position:"absolute",
                top: "70%",
                left: "45%",
                transform: "translate(-50% -50%)",
                width: "210px",
              }}
            >
              <ul style={
                {
                    widt:"100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }
                 }> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive ? 
                {
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    background: "#131921",
                    padding: "8px 0",
                    cursor: "pointer",
                    border: "1px solid #f3a847",
              }
            :{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    background: "#232F3E",
                    padding: "8px 0",
                    cursor: "pointer",
                    border: "1px solid #f3a847",
            }
        }
            >
              {i + 1}
            </div>
          ),
          responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
      };
  return (
    <div className='w-full'>
        <div className='w-full h-full relative'>
            <Slider {...settings} >
            <div>
                <img src={amazonBanner} alt="banner-image" />
            </div>
            <div>
                <img src={amazonAddBanner1} alt="amazonAddBanner1" />
            </div>
            <div>
                <img src={amazonAddBanner2} alt="amazonAddBanner2" />
            </div>
            <div>
                <img src={amazonAddBanner3} alt="amazonAddBanner3" />
            </div>
            <div>
                <img src={amazonAddBanner4} alt="amazonAddBanner4" />
            </div>
            </Slider>
          </div>
      </div>
  )
}

export default Banner
