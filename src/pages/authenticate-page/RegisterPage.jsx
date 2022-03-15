import React, { useEffect, useState } from 'react'
import './auth.scss'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { registerInitiate, clearError } from '../../redux/actions/auth_action'
import Helmet from '../../components/Helmet'
import inputs from '../../utils/inputs'
import InputForm from '../../components/input/InputForm'


const RegisterPage = () => {

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

    const handleRegister = (e) => {
        if(e) {
            e.preventDefault()
            dispatch(registerInitiate(values.email, values.password))
        }
    }

    return (
        <Helmet title='Sign up'>
            <div className="container">
                <div className="wrap">
                    <div className="form">
                        <form id='form-register' onSubmit={handleRegister}>
                            <h2>Đăng ký tài khoản</h2>
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
                                form='form-register'
                            >
                                Đăng ký ngay
                            </Button>
                            <div className="option">
                                <Link to='/login'>
                                    Bạn đã có tài khoản ?
                                    <span>Đăng nhập</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default RegisterPage