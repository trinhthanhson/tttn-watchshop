import React from 'react'
import { Image } from 'antd'
import Silder from 'react-slick'
const SlideComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };
    return (
        <Silder {...settings}>
            {arrImages.map((image) => {
                return (
                    <Image src={image} alt="slider" preview={false} width="100%" height="300px" />
                )
            })}
        </Silder>
    )
}

export default SlideComponent