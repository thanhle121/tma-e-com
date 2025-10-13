import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import { Outlet } from 'react-router-dom'
import './DefaultLayout.css'

function DefaultLayout(){
    return(
        <div className="body-web">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default DefaultLayout