import { Link } from "react-router-dom"
import logo from '../assets/logo.png'

function Header(){
    return(
        <header>
            <div className="nav">
                <div className="header-logo">
                    <img style={{width: '100px'}} src={logo} alt="" />
                </div>
                <div className="header-menu">
                    <Link to='/'>Home</Link>
                    <Link to='/cart'>Cart</Link>
                    <Link to='/contact'>Contact</Link>
                    <Link to='/about'>About</Link>
                </div>
            </div>
        </header>
    )
}

export default Header