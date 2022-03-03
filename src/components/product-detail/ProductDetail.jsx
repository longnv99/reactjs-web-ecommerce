import React, { useEffect, useState } from 'react'
import './ProductDetail.scss'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../button/Button'

import numberWithCommas from '../../utils/convertNumber'
import { addItem } from '../../redux/actions/cart_action'
import { removeModal } from '../../redux/actions/modal_action'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/firebaseConfig'

const ProductDetail = (props) => {

    let product = props.product

    if(product === undefined) {
        product = {
            title: '',
            price: '',
            color: [],
            size: [],
            discount: null,
        }
    }

    const dispatch = useDispatch()

    let navigate = useNavigate()

    const { user } = useSelector((state) => state.user)

    const cartItems = useSelector((state) => state.cart.cartItems)

    const [previewImg, setPreviewImg] = useState(product.img1)

    const [color, setColor] = useState(product.color[0])

    const [size, setSize] = useState(product.size[0])

    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        setPreviewImg(product.img1)
        setColor(product.color[0])
        setSize(product.size[0])
        setQuantity(1)
        //window.scrollTo(0, 0)
    }, [product])

    const addToCart = () => {
        if(user) {
            const newItem = {
                pathName: product.pathName,
                color: color,
                size: size,
                price: product.price * (100 - product.discount) / 100,
                quantity: quantity
            }
            if(dispatch(addItem(newItem))){
                alert('Đã thêm sản phẩm vào giỏ hàng')
            }
            else{
                alert('Error')
            }
        }else {
            dispatch(removeModal())
            navigate('/login')
            alert('Vui lòng đăng nhập tài khoản')
        }
    }

    const goToCart = () => {
        if(user) {
            const newItem = {
                pathName: product.pathName,
                color: color,
                size: size,
                price: product.price * (100 - product.discount) / 100,
                quantity: quantity
            }
            if(dispatch(addItem(newItem))){
                dispatch(removeModal())
                navigate('/cart')
            }
            else {
                alert('Error')
            }
        }else {
            dispatch(removeModal())
            navigate('/login')
            alert('Vui lòng đăng nhập tài khoản')
        }
    }

    useEffect(() => {
        if(user) {
            db.collection('user').doc(user.uid)
            .update('cart', cartItems.sort((first, second) => 
            first.id > second.id ? 1 : (first.id < second.id ? -1 : 0)))
        }
    }, [cartItems])

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