import Footer from "../components/Footer"
import Header from "../components/Header"
import { Outlet } from 'react-router-dom'
import './DefaultLayout.css'

function DefaultLayout(){
    return(
        <>
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
        </>
    )
}

export default DefaultLayout