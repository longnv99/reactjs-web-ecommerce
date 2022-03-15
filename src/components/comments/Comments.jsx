import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { db, dataID } from '../../firebase/firebaseConfig'
import Button from '../button/Button'
import './Comments.scss'

const Comments = (props) => {

    const field = props.product.pathName

    const [comment, setComment] = useState('')

    const [evaluate, setEvaluate] = useState([])

    const { user } = useSelector((state) => state.user)

    const navigate = useNavigate()

    useEffect(() => {
        handleEvaluate()
    }, [field])

    const handleEvaluate = () => {
        db.collection('evaluate').doc(dataID).get(field)
        .then((snapshot) => {
            if(snapshot) {
                setEvaluate(snapshot.data()[field])
            }
        })
    }

    const handleComment = () => {
        if(comment === '') {
            alert('Vui lòng nhập đánh giá của bạn !')
        }else {
            if(user){
                const current = new Date();
                const cm = {
                    email: user.email,
                    time: current.toLocaleString(),
                    body: comment,
                }

                db.collection('evaluate').doc(dataID).get(field)
                .then((snapshot) => {
                    //update comments fb
                    if(snapshot) {
                        const arr = snapshot.data()[field]

                        db.collection('evaluate').doc(dataID)
                        .update(field, arr.concat(cm).reverse())  
                        
                        setComment('')
                        handleEvaluate()
                    }
                })
                .catch((err) => console.log(err))
            }else {
                alert('Vui lòng đăng nhập tài khoản')
                navigate('/login')
            }
        }
    }

    return (
        <div className="comments">
            {
                evaluate.length > 0 ? (
                    evaluate.map((item, index) => (
                        <Comment item={item} key={index} />
                    )).slice(0, 5)
                ) : (
                    <div className="comments__notify">Chưa có đánh giá nào cho sản phẩm này</div>
                )
            }
            <div className="comments__form">
                <div className="comments__item__img">
                    <i className="fa-solid fa-circle-user"></i>
                </div>
                <div className="comments__item__content">
                    <div className="comments__item__content__email">{user ? user.email : 'Người dùng'}</div>
                    <input 
                        type="text" 
                        className='comments__item__content__input'
                        placeholder='Viết đánh giá'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}  
                    />
                    <Button
                        onClick={handleComment}
                    >
                        Gửi
                    </Button>
                </div>
            </div>
        </div>
    )
}

const Comment = (props) => {
    return (
        <div className="comments__item">
            <div className="comments__item__img">
                <i className="fa-solid fa-circle-user"></i>
            </div>
            <div className="comments__item__content">
                <div className="comments__item__content__email">{props.item.email}</div>
                <div className="comments__item__content__time">{props.item.time}</div>
                <div className="comments__item__content__body">{props.item.body}</div>
            </div>
        </div>
    )
}

export default Comments