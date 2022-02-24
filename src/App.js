import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import RoutesConfig from './routes/RoutesConfig';

function App() {
    return (
        <BrowserRouter>
            <Header/>
                <div className="container">
                    <div className="main">
                        <RoutesConfig/>
                    </div>
                </div>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
