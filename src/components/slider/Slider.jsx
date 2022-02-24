import React, { useCallback, useEffect, useState } from 'react'
import './Slider.scss'
import { Link } from 'react-router-dom'
import Button from '../button/Button'

import products from '../../assets/data/products'

const Slider = (props) => {

    console.log(products);

    const data = props.data

    const timeOut = props.timeOut ? props.timeOut : 3000

    const [activeSlide, setActiveSlide] = useState(0);

    const nextSlide = useCallback(() => 
        {
            const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1
            setActiveSlide(index)
        },
        [activeSlide, data],
    )

    const prevSlide = () => {
        const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1
        setActiveSlide(index)
    }

    useEffect(() => {
        if (props.auto) {
            const slideAuto = setInterval(() => {
                nextSlide()
            }, timeOut);
            return () => {
                clearInterval(slideAuto)
            }
        }
    }, [nextSlide, timeOut, props])

    return (
        <div className="slider">
            {
                data.map((item, index) => (
                    <SliderItem key={index} item={item} active={index === activeSlide}/>
                ))
            }
            {
                props.control ? (
                    <div className="slider__control">
                        <div className="slider__control__item" onClick={prevSlide}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </div>
                        <div className="slider__control__item">
                            <div className="index">
                                {activeSlide + 1}/{data.length}
                            </div>
                        </div>
                        <div className="slider__control__item" onClick={nextSlide}>
                            <i className="fa-solid fa-chevron-right"></i>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

const SliderItem = props => (
    <div className={`slider__item ${props.active ? 'active' : ''}`} >
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