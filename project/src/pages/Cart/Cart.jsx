import { useContext } from "react"
import { CartContext } from "../../context/CartProvider/CartProvider"
import './Cart.css'
import { DeleteOutlined } from '@ant-design/icons'

function Cart(){
    const { cart, deleteItem } = useContext(CartContext)
    const total = cart.reduce((sum, item)=> sum + item.price*item.quantity, 0)


    return(
        <>
        <h2>Cart</h2>
        <div className="cart-wrapper">
            <div className="cart-list">
                {cart.length === 0 ? (
                    <table className="cart-table">
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Thành tiền</th>
                                        <th>Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                                            Chưa có sản phẩm nào
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                ):(
                    <table className="cart-table">
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Thành tiền</th>
                                        <th>Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item, index)=>(
                                        <tr key={index}>
                                            <td>{item.title}</td>
                                            <td>${item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>${(item.quantity*item.price).toFixed(2)}</td>
                                            <td><button onClick={()=>deleteItem(item.id)}><DeleteOutlined /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                    </table>       
                )}
            </div>
            <div className="cart-total">
                <p>Total: ${total.toFixed(2)}</p>
                <button className="check-btn">Check out</button>
            </div>
        </div>
        </>
    )
}

export default Cart