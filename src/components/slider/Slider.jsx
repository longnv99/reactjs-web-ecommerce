import React, { useCallback, useEffect, useState } from 'react'
import './Slider.scss'
import { Link } from 'react-router-dom'
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide }from 'swiper/react';
import Button from '../button/Button'

const Slider = (props) => {

    const data = props.data

    SwiperCore.use([Autoplay, Pagination]);

    return (
        <div className="slider">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{delay: 5000}}
                pagination={{ clickable: true,  }}
            >
                {
                    data.map((item, index) => (
                        <SwiperSlide key={index}>
                            {({ isActive }) => (
                                <SliderItem item={item} active={`${isActive ? 'active' : ''}`}/>
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

const SliderItem = props => (
    <div className={`slider__item ${props.active}`} >
        <div className="slider__item__info">
            <div className="slider__item__info__title">
                <span>{props.item.title}</span>
            </div>
            <div className="slider__item__info__description">
                <span>{props.item.description}</span>
            </div>
            <div className="slider__item__info__btn">
                <Link to={props.item.path}>
                    <Button
                        backgroundColor={props.item.color}
                        icon='fa-solid fa-cart-plus'
                        animate={true}
                        size='sm'
                    >
                        Xem chi tiết
                    </Button>
                </Link>
            </div>
        </div>
        <div className="slider__item__image">
            <img src={props.item.img} alt="" />
        </div>
    </div>
)

export default Slider