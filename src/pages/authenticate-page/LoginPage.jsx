import React, { useEffect, useState } from 'react'
import './auth.scss'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { loginInitiate } from '../../redux/actions/auth_action'
import Helmet from '../../components/Helmet'

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const { user, error } = useSelector((state) => state.user)

    const navigate = useNavigate()

    useEffect(() => {
        if(user) {
            navigate('/')
        }
        if(error !== null) {
            alert(error)
        }
    }, [user, error])

    const handleLogin = () => {
        dispatch(loginInitiate(email, password));
        setEmail('');
        setPassword('');
    }
    
    return (
        <Helmet title='Sign in'>
            <div className="container">
                <div className="wrap">
                    <div className="form">
                        <h2>Đăng nhập</h2>
                        <div className="form__item">
                            <div className="form__item__title">Tài khoản</div>
                            <input 
                                className="form__item__input" 
                                type="email" 
                                placeholder='Email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form__item">
                            <div className="form__item__title">Mật khẩu</div>
                            <input 
                                className="form__item__input" 
                                type="password" 
                                placeholder='Mật khẩu'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button 
                            size='block'
                            onClick={handleLogin}
                        >
                            Đăng nhập
                        </Button>
                        <div className="option">
                            <Link to='/register'>
                                Bạn chưa có tài khoản ?
                                <span>Đăng ký</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default LoginPage