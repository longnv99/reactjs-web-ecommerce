import React, { useEffect, useState } from 'react'
import '../components/cart-item/CartItem.scss'
import { useSelector } from 'react-redux'

import Helmet from '../components/Helmet'

import dataProducts from '../assets/data/products'
import numberWithCommas from '../utils/convertNumber'
import Button from '../components/button/Button'
import { Link } from 'react-router-dom'
import CartItem from '../components/cart-item/CartItem'

const CartPage = () => {

    const cartItems = useSelector((state) => state.cart.cartItems)

    const [cartProducts, setCartProducts] = useState([])

    const [total, setTotal] = useState(0)

    const [price, setPrice] = useState(0)

    useEffect(() => {
        setCartProducts(dataProducts.getCartItems(cartItems))
        setTotal(cartItems.reduce((total, item) => total + item.quantity, 0))
        setPrice(cartItems.reduce((total, item) => 
            total + item.quantity * Number(item.price)
            , 0)
        )
    }, [cartItems])

    return (
        <Helmet title='Cart'>
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>Bạn đang có {total} trong giỏ hàng</p>
                        <div className="cart__info__txt__price">
                            <span>Tổng tiền: </span>
                            <span>{numberWithCommas(price)}đ</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Button size="block">
                            Đặt hàng
                        </Button>
                        <Link to="/catalog">
                            <Button size="block">
                                Tiếp tục mua hàng
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="cart__list">
                    {
                        cartProducts.map((item, index) => (
                            <CartItem item={item} key={index}/>
                        ))
                    }
                </div>
            </div>
        </Helmet>
    )
}

export default CartPage