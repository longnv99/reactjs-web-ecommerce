import React, { useEffect, useState } from 'react'
import './ProductModal.scss'

import ProductDetail from '../product-detail/ProductDetail'

import dataProducts from '../../assets/data/products'

import { useDispatch, useSelector } from 'react-redux'
import { removeModal } from '../../redux/actions/modal_action'

const ProductModal = () => {

        const pathName = useSelector((state) => state.modal.pathName)

        const dispatch = useDispatch()

        const [product, setProduct] = useState(undefined)

        useEffect(() => {
            setProduct(dataProducts.getProductByPathName(pathName))
        }, [pathName])

    return (
        <div className={`modal ${product === undefined ? '' : 'active'}`}>
            <div className="modal__content">
                <ProductDetail product={product}/>
                <div className="modal__content__close">
                    <i 
                        className="fa-solid fa-xmark"
                        onClick={() => dispatch(removeModal())}
                    ></i>
                </div>
            </div>
        </div>
    )
}

export default ProductModal