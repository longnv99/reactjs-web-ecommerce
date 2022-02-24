import React from 'react'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import Slider from '../components/slider/Slider'
import Section, { SectionBody, SectionTitle } from '../components/section/Section'
import Policy from '../components/policy/Policy'
import Product from '../components/product/Product'

import sliderData from '../assets/data/data-slider'
import policy from '../assets/data/policy'
import dataProducts from '../assets/data/products'
import banner from '../assets/images/banner.png'



const HomePage = () => {
    return (
        <Helmet title='Home'>
            <Slider 
                data={sliderData}
                control={true}
                auto={false}
                timeOut={4000}
            />
            <Section>
                <SectionBody>
                    <div className="grid">
                        {
                            policy.map((item, index) => 
                            <Link key={index} to="/">
                                <Policy
                                    name={item.name}
                                    description={item.description}
                                    icon={item.icon}
                                    highlight={item.highlight}
                                />
                            </Link>)
                        }
                    </div>
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>SALE UPTO 66%</SectionTitle>
                <img src={banner} alt="" className="banner"/>
                <SectionBody>
                    <div className="grid">
                        {
                            dataProducts.getProductDiscount().map((item, index) => 
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
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>Sản phẩm bán chạy</SectionTitle>
                <SectionBody>
                    <div className="grid">
                        {
                            dataProducts.getProductPopular(4).map((item, index) => 
                            (
                                <Product
                                    key={index}
                                    img1={item.img1}
                                    img2={item.img2}
                                    title={item.title}
                                    price={item.price}
                                    pathName={item.pathName}
                                    discount={item.discount}
                                    hot={true}
                                />
                            ))
                        }
                    </div>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default HomePage