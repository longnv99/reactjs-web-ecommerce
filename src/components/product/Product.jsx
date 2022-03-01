import React from 'react'
import { Link } from 'react-router-dom'
import './Product.scss'

import Button from '../button/Button'
import numberWithCommas from '../../utils/convertNumber'
import { useDispatch } from 'react-redux'
import { setModal } from '../../redux/actions/modal_action'

const Product = (props) => {

    const dispatch = useDispatch()

    return (
        <div className="product">
            <Link to={`/catalog/${props.pathName}`}>
                <div className="product__image">
                    <img src={props.img1} alt="" />
                    <img src={props.img2} alt="" />
                    {
                        props.discount ? (
                            <div className="product__image__discount">- {props.discount}%</div>
                        ) : null
                    }
                    {
                        props.hot ? (
                            <div className="product__image__hot">HOT</div>
                        ) : null
                    }
                </div>
                <div className="product__name">{props.title}</div>
                {
                    props.discount ? (
                        <div className="product__price">
                            {numberWithCommas(props.price * (100 - props.discount) / 100)}đ
                            <del className="product__price__old">
                                {numberWithCommas(props.price)}đ
                            </del>
                        </div>
                    ) : (
                        <div className="product__price">{numberWithCommas(props.price)}đ</div>
                    )
                }
            </Link>
            <div className="product__btn">
                <Button
                    icon='fa-solid fa-cart-plus'
                    animate={true}
                    size='sm'
                    onClick={() => dispatch(setModal(props.pathName))}
                >
                    Mua ngay
                </Button>
            </div>
        </div>
    )
}

export default Product