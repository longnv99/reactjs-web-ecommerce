import React, { useEffect, useState } from 'react'
import './auth.scss'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { loginInitiate, clearError } from '../../redux/actions/auth_action'
import Helmet from '../../components/Helmet'
import inputs from '../../utils/inputs'
import InputForm from '../../components/input/InputForm'

const LoginPage = () => {

    const dispatch = useDispatch()

    const { user, error } = useSelector((state) => state.user)

    const navigate = useNavigate()

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if(user) {
            navigate('/')
        }
        if(error !== null) {
            alert(error)
            dispatch(clearError())
        }
    }, [user, error])

    const handleLogin = (e) => {
        if(e) {
            e.preventDefault();
            dispatch(loginInitiate(values.email, values.password));
        }
    }
    
    return (
        <Helmet title='Sign in'>
            <div className="container">
                <div className="wrap">
                    <div className="form">
                        <form id='form-login' onSubmit={handleLogin}>
                            <h2>Đăng nhập</h2>
                            {
                                inputs.map((input, index) => (
                                    <InputForm 
                                        key={index}
                                        {...input}
                                        value={values[input.name]}
                                        onChange={(e) => setValues({
                                            ...values,
                                            [e.target.name]: e.target.value
                                        })}
                                    />
                                ))
                            }
                            <Button 
                                size='block'
                                type='submit'
                                form='form-login'
                            >
                                Đăng nhập
                            </Button>
                            <div className="option">
                                <Link to='/register'>
                                    Bạn chưa có tài khoản ?
                                    <span>Đăng ký</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default LoginPage