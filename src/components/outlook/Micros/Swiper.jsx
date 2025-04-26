import React from 'react'
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';

const MySwiper = ({ children, bulletColor, space }) => {
  return (
    <>
        <Swiper
            spaceBetween={space}
            loop={"true"}
            centeredSlides={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
                renderBullet: (index, className) =>
                    `<span class="${className}" style="background-color: ${bulletColor} ;"></span>`,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
        >
            {React.Children.map(children, (child, index) => (
                <SwiperSlide key={index}>
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    </>
  )
}

export default MySwiper