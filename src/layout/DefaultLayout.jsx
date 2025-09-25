import Footer from "../components/Footer"
import Header from "../components/Header"
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