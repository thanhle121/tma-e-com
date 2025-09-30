import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import styles from './Header.module.css'


function Menu(){
    return (
        <div className={styles.menu}>
            <Link to='/'>Home</Link>
            <Link to='/contact'>Contact</Link>
            <Link to='/about'>About</Link>
            <CartIcon />
        </div>
    )
}

export default Menu