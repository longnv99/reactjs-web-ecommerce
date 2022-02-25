import React, { useCallback, useEffect, useRef, useState } from 'react'
import './Catalog.scss'
import Helmet from './../../components/Helmet'
import Product from './../../components/product/Product'
import Checkbox from '../../components/checkbox/Checkbox'
import Button from '../../components/button/Button'

import dataProducts from '../../assets/data/products'
import category from '../../assets/data/category'
import colors from '../../assets/data/colors'
import size from '../../assets/data/size'

const CatalogPage = () => {

    const initFilter = {
        category: [],
        color: [],
        size: [],
    }

    const productList = dataProducts.getAllProduct()

    const [products, setProduct] = useState(productList)

    const [filter, setFilter] = useState(initFilter)

    const filterSelect = (type, checked, item) => {
        if(checked) {
            switch(type) {
                case 'CATEGORY':
                    setFilter({...filter, category: [...filter.category, item.categoryPath]})
                    break
                case 'COLOR':
                    setFilter({...filter, color: [...filter.color, item.color]})
                    break
                case 'SIZE':
                    setFilter({...filter, size: [...filter.size, item.size]})
                    break
                default:
            }
        } else {
            switch(type) {
                case 'CATEGORY':
                    const newCategory = filter.category.filter(e => e !==item.categoryPath)
                    setFilter({...filter, category: newCategory})
                    break
                case 'COLOR':
                    const newColor = filter.color.filter(e => e !==item.color)
                    setFilter({...filter, color: newColor})
                    break
                case 'SIZE':
                    const newSize = filter.size.filter(e => e !==item.size)
                    setFilter({...filter, size: newSize})
                    break
                default:
            }
        }
    }

    const updateProductsFilter = useCallback(
        () => {
            let temp = productList

            if(filter.category.length > 0) {
                temp = temp.filter(e => filter.category.includes(e.categoryPath))
            }

            if(filter.color.length > 0) {
                temp = temp.filter(e => {
                    const check = e.color.find(color => filter.color.includes(color))
                    return check !== undefined
                })
            }

            if(filter.size.length > 0) {
                temp = temp.filter(e => {
                    const check = e.size.find(size => filter.size.includes(size))
                    return check !== undefined
                })
            }

            setProduct(temp)
        },
        [filter, productList],
    )

    useEffect(() => {
      updateProductsFilter()
    }, [updateProductsFilter])

    const clearFilter = () => setFilter(initFilter)
    
    const filterRef = useRef(null)
    const showHiddenFilter = () => filterRef.current.classList.toggle('active')

    return (
        <Helmet title='Catalog'>
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__header">
                        <i className="fa-solid fa-filter"></i>
                        Bộ lọc tìm kiếm
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Theo sản phẩm
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                category.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <Checkbox 
                                            label={item.display}
                                            onChange={
                                                (input) => filterSelect('CATEGORY', input.checked, item)
                                            }
                                            checked={filter.category.includes(item.categoryPath)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Theo màu sắc
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                colors.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <Checkbox 
                                            label={item.display}
                                            onChange={
                                                (input) => filterSelect('COLOR', input.checked, item)
                                            }
                                            checked={filter.color.includes(item.color)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Theo kích cỡ
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                size.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <Checkbox 
                                            label={item.display}
                                            onChange={
                                                (input) => filterSelect('SIZE', input.checked, item)
                                            }
                                            checked={filter.size.includes(item.size)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size='sm' onClick={clearFilter}>Xóa bộ lọc</Button>
                        </div>
                    </div>
                    <div className="catalog__filter__close" onClick={showHiddenFilter}>
                        <i className="fa-solid fa-angles-left"></i>
                    </div>
                </div>
                <div className="catalog__filter__toggle" onClick={showHiddenFilter}>
                    <i className="fa-solid fa-angles-right"></i>
                </div>
                <div className="catalog__content">
                    <div className="grid__3col">
                        {
                            products.map((item, index) => 
                            (
                                <Product
                                    key={index}
                                    img1={item.img1}
                                    img2={item.img2}
                                    title={item.title}
                                    price={item.price}
                                    pathName={item.pathName}
                                    discount={item.discount}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default CatalogPage