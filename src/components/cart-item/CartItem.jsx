import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import numberWithCommas from '../../utils/convertNumber'
import { updateItem, removeItem } from '../../redux/actions/cart_action'
import { db } from '../../firebase/firebaseConfig'

const CartItem = (props) => {

    const [item, setItem] = useState(props.item)

    const [quantity, setQuantity] = useState(props.item.quantity)

    const dispatch = useDispatch()

    const itemRef = useRef(null)

    const cartItems = useSelector((state) => state.cart.cartItems)

    const { user } = useSelector((state) => state.user)


    useEffect(() => {
        setItem(props.item)
        setQuantity(props.item.quantity)
    }, [props.item])

    useEffect(() => {
        //sort and update in firebase
        if(user){
            db.collection('user').doc(user.uid)
            .update('cart', cartItems.sort((first, second) => 
            first.id > second.id ? 1 : (first.id < second.id ? -1 : 0)))
        }
    }, [cartItems])

    const updateQuantity = (opt) => {
        if (opt === '+') {
            dispatch(updateItem({...item, quantity: quantity + 1}))
        }
        if (opt === '-') {
            dispatch(updateItem({...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1}))
        }
    }

    const removeCartItem = () => {
        console.log('removeCartItem')
        dispatch(removeItem(item))
    }

    return (
        <div className="cart__item" ref={itemRef}>
            <div className="cart__item__image">
                <img src={item.info.img1} alt="" />
            </div>
            <div className="cart__item__info">
                <div className="cart__item__info__name">
                    <Link to={`/catalog/${item.slug}`}>
                        {`${item.info.title} - ${item.color} - ${item.size}`}
                    </Link>
                </div>
                <div className="cart__item__info__price">
                    {numberWithCommas(item.price)}đ
                </div>
                <div className="cart__item__info__quantity">
                    <div className="detail__info__catalog__quantity">
                        <div className="detail__info__catalog__quantity__btn cart__mobile" onClick={() => updateQuantity('-')}>
                            <i className="fa-solid fa-minus"></i>
                        </div>
                        <div className="detail__info__catalog__quantity__input cart__mobile">
                            {quantity}
                        </div>
                        <div className="detail__info__catalog__quantity__btn cart__mobile" onClick={() => updateQuantity('+')}>
                            <i className="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>
                <div className="cart__item__del">
                    <i className='fa-solid fa-trash-can' onClick={() => removeCartItem()}></i>
                </div>
            </div>
        </div>
    )
}

export default CartItem