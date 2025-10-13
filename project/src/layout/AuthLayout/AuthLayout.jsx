import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './AuthLayout.css'

function AuthLayout(){
    return(
        <div className="auth-layout">
            <Header />
            <div className="auth-box">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default AuthLayout