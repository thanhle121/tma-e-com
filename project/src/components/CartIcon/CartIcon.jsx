import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import styles from './CartIcon.module.css'
import { CartContext } from "../../context/CartProvider/CartProvider";

function CartIcon(){
    const { cartCount } = useContext(CartContext)

    return(
        <Link to='/cart' className={styles.cart}>
            <ShoppingCartOutlined />
            {cartCount > 0 && (
                <span className={styles.cartCount}>{cartCount}</span>
            )}
        </Link>
    )
}

export default CartIcon