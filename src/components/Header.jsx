import { Link } from "react-router-dom"
import logo from '../assets/logo.png'
import './Style.css'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function Header(){
    const { cartCount } = useContext(CartContext)
    return(
        <header>
            <div className="nav">
                <div className="header-logo">
                    <img src={logo} alt="" />
                </div>
                <div className="header-input">
                    <input type="text" placeholder="Search..." name="" id="" />
                </div>
                <div className="header-menu">
                    <Link to='/'>Home</Link>
                    <Link to='/contact'>Contact</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/cart' style={{position: 'relative'}}>
                        <ShoppingCartOutlined />
                        {cartCount>0 &&(
                            <span className="cart-icon">{cartCount}</span>
                        )}
                    </Link>
                </div>
                <div className="header-account">
                    <Link to='/'><UserOutlined />Đăng nhập</Link>
                </div>
            </div>
        </header>
    )
}

export default Header