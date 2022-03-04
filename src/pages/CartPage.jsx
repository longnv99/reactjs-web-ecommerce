import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from "react-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import '../components/cart-item/CartItem.scss'
import Button from '../components/button/Button'
import CartItem from '../components/cart-item/CartItem'

import dataProducts from '../assets/data/products'
import numberWithCommas from '../utils/convertNumber'
import { successPayment } from '../redux/actions/cart_action'
import { db } from '../firebase/firebaseConfig'


const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });


const CartPage = () => {

    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.user)

    const cartItems = useSelector((state) => state.cart.cartItems)

    const [cartProducts, setCartProducts] = useState([])

    const [total, setTotal] = useState(0)

    const [price, setPrice] = useState(0)

    const [checkout, setCheckout] = useState(false)

    const checkoutRef = useRef(null)

    useEffect(() => {
        setCartProducts(dataProducts.getCartItems(cartItems))
        setTotal(cartItems.reduce((total, item) => total + item.quantity, 0))
        setPrice(cartItems.reduce((total, item) => 
            total + item.quantity * Number(item.price)
            , 0)
        )
        if(user){
            db.collection('user').doc(user.uid)
            .update('cart', cartItems.sort((first, second) => 
            first.id > second.id ? 1 : (first.id < second.id ? -1 : 0)))
        }
    }, [cartItems])

    const handleCheckout = () => {
        if(cartItems.length > 0) {
            setCheckout(true)
        }else {
            setCheckout(false)
        }
    }

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: (price/22837).toFixed(2),
                    },
                },
            ],
        });
    };
    const onApprove = (data, actions) => {
        return actions.order.capture().then((orderData) => {
            dispatch(successPayment())
            saveHistoryPayment(orderData)
            setCheckout(false)
            alert('Thanh toán thành công')
        })
    };
    const onError = (err) => {
        alert('Thanh toán không thành công')
        console.log(err);
    }

    const saveHistoryPayment = (orderData) => {
        const current = new Date();
        const data = {
            time: current.toLocaleString(),
            value: `${orderData.purchase_units[0].amount.value} ${orderData.purchase_units[0].amount.currency_code}`
        }
        db.collection('user').doc(user.uid).get('payment_history')
        .then((snapshot) => {
            //update history payment in fb
            if(snapshot) {
                const arr = snapshot.data().payment_history
                db.collection('user').doc(user.uid)
                .update('payment_history', arr.concat(data).reverse())   
            }
        })
    }

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
                        <Button 
                            size="block"
                            onClick={() => handleCheckout()}
                        >
                            Đặt hàng
                        </Button>
                        <Link to="/catalog">
                            <Button size="block">
                                Tiếp tục mua hàng
                            </Button>
                        </Link>
                        {
                            checkout ? (
                                <div className='checkout' ref={checkoutRef}>
                                    <PayPalButton
                                        style={{ size: 'responsive' }}
                                        createOrder={(data, actions) => createOrder(data, actions)}
                                        onApprove={(data, actions) => onApprove(data, actions)}
                                        onError={(err) => onError(err)}
                                    />
                                </div>
                            ) : ''
                        }
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