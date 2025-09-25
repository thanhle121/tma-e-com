import { Link } from "react-router-dom"
import logo from '../assets/logo.png'
import './Style.css'

function Header(){
    return(
        <header>
            <div className="nav">
                <div className="header-logo">
                    <img src={logo} alt="" />
                </div>
                <div className="header-menu">
                    <Link to='/'>Home</Link>
                    <Link to='/contact'>Contact</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/cart'>Cart</Link>
                </div>
            </div>
        </header>
    )
}

export default Header