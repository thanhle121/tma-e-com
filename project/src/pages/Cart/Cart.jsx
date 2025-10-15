import { useContext } from "react"
import { CartContext } from "../../context/CartProvider/CartProvider"
import './Cart.css'
import { DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router"
import { getCookie } from "../../helpers/cookie"
import toast from "react-hot-toast"

function Cart(){
    const { cart, deleteItem } = useContext(CartContext)
    const total = cart.reduce((sum, item)=> sum + item.price*item.quantity, 0)
    const navigate = useNavigate()
    const email = getCookie('email')

    const handleCheckout = () => {
        if(email && total !== 0){
            navigate('/bill')
        } else if(email && total === 0){
            toast(()=>(
                <span>Bạn chưa có sản phẩm nào! Hãy quay lại <a href="/" style={{color: 'green'}}><strong>TRANG CHỦ</strong></a> để mua hàng.</span>
            ))
        } else if(!email && total !==0){
            toast(()=>(
                <span>Bạn chưa đăng nhập! Hãy <a href="/signin" style={{color: 'red'}}><strong>ĐĂNG NHẬP</strong></a> để mua hàng.</span>
            ))
        } else if(!email && total == 0){
            toast(()=>(
                <span>Bạn chưa có sản phẩm nào! Hãy quay lại <a href="/" style={{color: 'green'}}><strong>TRANG CHỦ</strong></a> để mua hàng.</span>
            ))
        }
    }

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
                <button className="check-btn" onClick={handleCheckout}>Check out</button>
            </div>
        </div>
        </>
    )
}

export default Cart