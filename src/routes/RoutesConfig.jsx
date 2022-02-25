import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import CartPage from '../pages/CartPage'
import ProductPage from '../pages/ProductPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import CatalogPage from '../pages/catalog-page/CatalogPage'

const RoutesConfig = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/catalog' element={<CatalogPage/>}>
                <Route path=':pathName' element={<ProductPage/>}/>
            </Route>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
    )
}

export default RoutesConfig