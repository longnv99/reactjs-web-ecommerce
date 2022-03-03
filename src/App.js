import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import RoutesConfig from './routes/RoutesConfig';
import ProductModal from './components/product-modal/ProductModal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { auth, db } from './firebase/firebaseConfig'
import { setUser } from './redux/actions/auth_action'
import { setCart } from './redux/actions/cart_action'

function App() {

    const dispatch = useDispatch()

    const cartItems = useSelector((state) => state.cart.cartItems)

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                dispatch(setUser(authUser))
                db.collection('user').doc(authUser.uid).get()
                .then((snapshot) => {
                    if(snapshot) {
                        dispatch(setCart(snapshot.data().cart))
                    }
                })
            }else {
                dispatch(setUser(null))
                dispatch(setCart([]))
            }
        })
    }, [dispatch])
    
    return (
        <BrowserRouter>
            <Header/>
                <div className="container">
                    <div className="main">
                        <RoutesConfig/>
                    </div>
                </div>
            <Footer/>
            <ProductModal />
        </BrowserRouter>
    );
}

export default App;
