import React, { useEffect, useRef } from 'react'
import './Header.scss'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logoutInitiate } from '../../redux/actions/auth_action'

const headerNav = [
    {
        display: 'Trang chủ',
        path: '/'
    },
    {
        display: 'Sản phẩm',
        path: '/catalog'
    },
    {
        display: 'Bộ sưu tập',
        path: '/collection'
    },
    {
        display: 'Liên hệ',
        path: '/contact'
    },
]

const Header = () => {

    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.user)
    const cartItems = useSelector((state) => state.cart.cartItems)

    const { pathname } = useLocation();
    const activeNav = headerNav.findIndex(nav => nav.path === pathname);
    
    const headerRef = useRef(null)
    const userRef = useRef()

    let sum = 0;

    cartItems.forEach((e) => {
        sum += e.quantity
    })

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('shrink')
            } else {
                headerRef.current.classList.remove('shrink')
            }
        })

        //change z-index header
        if(userRef.current) {
            userRef.current.addEventListener("mouseenter", () => {
                headerRef.current.classList.add('putup')
            })
            userRef.current.addEventListener("mouseleave", () => {
                headerRef.current.classList.remove('putup')
            })
        }

        return () => {
            window.removeEventListener("scroll")
            userRef.current.removeEventListener("mouseenter")
            userRef.current.removeEventListener("mouseleave")
        };
    }, []);

    const menuLeft = useRef(null)
    const menuToggle = () => menuLeft.current.classList.toggle('active')

    const handleLogout = () => {
        if(user) {
            dispatch(logoutInitiate())
        }
    }

    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__menu">
                    <div className="header__menu__mobile" onClick={menuToggle}>
                        <i className="fa-solid fa-bars"></i>
                    </div>
                    <div className="header__logo">
                        <Link to='/'>
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        {
                            headerNav.map((item, index) => (
                                <div 
                                    key={index} 
                                    className={`
                                        header__menu__left__item 
                                        header__menu__item 
                                        ${index === activeNav ? 'active' : ''}
                                    `}
                                    onClick={menuToggle}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            <Link to='/cart'>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </Link>
                            {
                                cartItems.length > 0 ? (
                                    <div className="header__menu__right__item__count">
                                        {sum}
                                    </div>
                                ) : null
                            }
                        </div>
                        <div ref={userRef} className="header__menu__item header__menu__right__item">
                            {
                                user ? (
                                    <Link to='#'>
                                        <i className="fa-solid fa-right-to-bracket"></i>
                                            <div className="user">
                                                <div className="user__email">{user.email}</div>
                                                <div 
                                                    className="user__logout"
                                                    onClick={handleLogout}
                                                >
                                                    <>Logout</>
                                                    <i className="fa-solid fa-right-from-bracket"></i>
                                                </div>
                                            </div>
                                    </Link>
                                ) : (
                                    <Link to='/login'>
                                        <i className="fa-solid fa-user"></i>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header