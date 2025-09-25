import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import './Cart.css'

function Cart(){
    const { cart } = useContext(CartContext)
    const total = cart.reduce((sum, item)=> sum + item.price*item.quantity, 0)

    return(
        <>
        <h2>Cart</h2>
        <div className="cart-wrapper">
            <div className="cart-list">
                {cart.length === 0 ? (
                    <p>Chưa có sản phẩm nào</p>
                ):(
                    <ul>
                        {cart.map((item)=>(
                            <li>
                                {item.title} - {item.quantity} x {item.price}$ = {item.quantity*item.price}$
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="cart-total">
                <p>Total: ${total}</p>
                <button className="check-btn">Check out</button>
            </div>
        </div>
        </>
    )
}

export default Cart