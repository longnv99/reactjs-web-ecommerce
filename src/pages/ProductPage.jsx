import React from 'react'
import { useParams } from 'react-router-dom'

import ProductDetail from '../components/product-detail/ProductDetail'
import Helmet from '../components/Helmet'
import Section, { SectionBody, SectionTitle } from '../components/section/Section'
import Product from '../components/product/Product'
import Comments from '../components/comments/Comments'

import dataProduct from '../assets/data/products'

const ProductPage = () => {

    const param = useParams();
    const product = dataProduct.getProductByPathName(param.pathName)

    return (
        <Helmet title={product.title}>
            <Section>
                <SectionBody>
                    <ProductDetail product={product}/>
                </SectionBody>
            </Section>
            <div className="separate"></div>
            <Section>
                <SectionTitle>Đánh giá</SectionTitle>
                <SectionBody>
                    <Comments product={product}/>
                </SectionBody>
            </Section>
            <div className="separate"></div>
            <Section>
                <SectionTitle>Có thể bạn cũng thích</SectionTitle>
                <SectionBody>
                    <div className="grid">
                        {
                            dataProduct.getProductPopular(4).map((item, index) => 
                            (
                                <Product
                                    key={index}
                                    img1={item.img1}
                                    img2={item.img2}
                                    title={item.title}
                                    price={item.price}
                                    pathName={item.pathName}
                                    discount={item.discount}
                                    hot={false}
                                />
                            ))
                        }
                    </div>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default ProductPage