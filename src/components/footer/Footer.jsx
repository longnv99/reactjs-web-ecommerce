import React from 'react'
import './Footer.scss'
import logo from '../../assets/images/footer-logo.png'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer__content container">
                <div className="footer__content__header"> 
                    <div className="footer__content__header__logo">
                        <Link to='/'>
                            <img src={logo} alt="" /> 
                        </Link>
                    </div>
                    <div className="footer__content__header__link">
                        <Link to='/'><i className="fa-brands fa-facebook"></i></Link>
                        <Link to='/'><i className="fa-brands fa-twitter"></i></Link>
                        <Link to='/'><i className="fa-brands fa-linkedin-in"></i></Link>
                        <Link to='/'><i className="fa-brands fa-instagram"></i></Link>
                        <Link to='/'><i className="fa-brands fa-youtube"></i></Link>
                    </div>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu">
                        <div className="footer__content__menu__header">Menu</div>
                        <Link to='/'>Home</Link>
                        <Link to='/'>Computers</Link>
                        <Link to='/'>Mans Clothes</Link>
                        <Link to='/'>Womans Clothes</Link>
                        <Link to='/'>Contact us</Link>
                    </div>
                    <div className="footer__content__menu">
                        <div className="footer__content__menu__header">Useful Link</div>
                        <Link to='/'>Adipiscing</Link>
                        <Link to='/'>Elit, sed doTemporincididunt</Link>
                        <Link to='/'>Eiusmod</Link>
                        <Link to='/'>Temporincididunt</Link>
                    </div>
                    <div className="footer__content__menu">
                        <div className="footer__content__menu__header">Contact</div>
                        <Link to='/'>London 145 United Kingdom</Link>
                        <Link to='/'>+7586656566</Link>
                        <Link to='/'>volim@gmail.com</Link>
                    </div>
                    
                </div>
                <div className="footer__content__footer">
                    2020 All Rights Reserved. Design by Free html Templates
                </div>
            </div>
        </div>
    )
}

export default Footer