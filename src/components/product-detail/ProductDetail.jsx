import React, { useEffect, useState } from 'react'
import './ProductDetail.scss'

import Button from '../button/Button'

import numberWithCommas from '../../utils/convertNumber'

const ProductDetail = (props) => {

    const product = props.product

    const [previewImg, setPreviewImg] = useState(product.img1)

    const [color, setColor] = useState(product.color[0])

    const [size, setSize] = useState(product.size[0])

    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        setPreviewImg(product.img1)
        setColor(product.color[0])
        setSize(product.size[0])
        setQuantity(1)
        window.scrollTo(0, 0)
    }, [product])

    const addToCart = () => {

    }

    const goToCart = () => {
        
    }

    return (
        <div className="detail">
            <div className="detail__images">
                <div className="detail__images__list">
                    <div className="detail__images__list__item" onMouseEnter={() => setPreviewImg(product.img1)}>
                        <img src={product.img1} alt="" />
                    </div>
                    <div className="detail__images__list__item" onMouseEnter={() => setPreviewImg(product.img2)}>
                        <img src={product.img2} alt="" />
                    </div>
                </div>
                <div className="detail__images__main">
                    <img src={previewImg} alt="" />
                </div>
            </div>
            <div className="detail__info">
                <div className="detail__info__catalog">
                    <div className="detail__info__header">{product.title}</div>
                    {
                        product.discount ? (
                            <div className="detail__info__catalog__price">
                                {numberWithCommas(product.price * (100 - product.discount) / 100)}đ
                                <del className="detail__info__catalog__price__old">
                                    {numberWithCommas(product.price)}đ
                                </del>
                            </div>
                        ) : (
                            <div className="detail__info__catalog__price">{numberWithCommas(product.price)}đ</div>
                        )
                    }
                </div>
                <div className="detail__info__catalog">
                    <div className="detail__info__catalog__title">Màu sắc</div>
                    <div className="detail__info__catalog__list">
                        {
                            product.color.map((item, index) => (
                                <div 
                                    key={index} 
                                    className={`detail__info__catalog__list__item ${color === item ? 'active' : ''}`} 
                                    onClick={() => setColor(item)}
                                >
                                    <div className={`circle bg-${item}`}></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="detail__info__catalog">
                    <div className="detail__info__catalog__title">Kích cỡ</div>
                    <div className="detail__info__catalog__list">
                        {
                            product.size.map((item, index) => (
                                <div 
                                    key={index} 
                                    className={`detail__info__catalog__list__item ${size === item ? 'active' : ''}`} 
                                    onClick={() => setSize(item)}
                                >
                                    <div className="detail__info__catalog__list__item__size">
                                        {item}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="detail__info__catalog">
                    <div className="detail__info__catalog__title">Số lượng</div>
                    <div className="detail__info__catalog__quantity">
                        <div className="detail__info__catalog__quantity__btn" onClick={() => setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)}>
                            <i className="fa-solid fa-minus"></i>
                        </div>
                        <div className="detail__info__catalog__quantity__input">
                            {quantity}
                        </div>
                        <div className="detail__info__catalog__quantity__btn" onClick={() => setQuantity(quantity + 1)}>
                            <i className="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="detail__info__catalog">
                <div className="product__info__item">
                    <Button 
                        icon='fa-solid fa-cart-plus'
                        animate={true}
                        onClick={() => addToCart()}
                    >
                        Thêm Vào Giỏ Hàng
                    </Button>
                    <Button 
                        active={true}
                        onClick={() => goToCart()}
                    >Mua Ngay</Button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail