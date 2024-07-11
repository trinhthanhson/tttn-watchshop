import React from 'react'
import { Image } from 'antd'
import { WrapperSlideStyle } from './style';
const SlideComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };
    return (
        <WrapperSlideStyle {...settings}>
            {arrImages.map((image) => {
                return (
                    <Image src={image} alt="slider" preview={false} width="100%" height="274px" />
                )
            })}
        </WrapperSlideStyle>
    )
}

export default SlideComponent