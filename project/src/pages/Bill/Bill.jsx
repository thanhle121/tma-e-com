import { useNavigate } from "react-router"
import { getCookie } from "../../helpers/cookie"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../context/CartProvider/CartProvider"
import styles from './Bill.module.css'
import toast from "react-hot-toast"
import { get, patch } from "../../utils/request"

function Bill(){
    const { cart, setCart } = useContext(CartContext)
    const navigate = useNavigate()
    const email = getCookie('email')
    const userId = getCookie('id')
    const [customer, setCustomer] = useState({
        name: '',
        email: email || '',
        phone: '',
        address: ''
    })

    useEffect(()=>{
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
    }, [])

    if(!email) return null

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const handleChange = (e) => {
        const { name, value } = e.target
        setCustomer({ ...customer, [name]: value })
    }

    const handlePlaceOrder = async () => {
        if(!customer.name || !customer.address || !customer.phone){
            toast.error('Vui lòng điền đầy đủ thông tin giao hàng')
            return
        }

        try{
            const account = await get(`accounts/${userId}`)

            const orderProducts = cart.map(item => ({
                title: item.title,
                thumbnail: item.thumbnail,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity, 
                brand: item.brand
            }))

            const newOrder = {
                id: Date.now(),
                customer,
                // products: cart,
                products: orderProducts,
                total,
                date: new Date().toLocaleString()
            }

            const updateOrders = account.order ? [...account.order, newOrder] : [newOrder]

            await patch(`accounts/${userId}`, { order: updateOrders })

            setCart([])

            toast.success('Đặt hàng thành công!')
            navigate('/')
        } catch (err) {
            console.log(err);
            toast.error('Có lỗi xảy ra: ')
        } 
    }

    return(
        <>
            <h1 className={styles.title}>Bill Details</h1>

            <div className={styles.billWrapper}>
                <div className={styles.billLeft}>
                    <form className={styles.billForm}>
                        <div>Name</div>
                        <input
                            type="text"
                            name="name"
                            value={customer.name}
                            onChange={handleChange}
                            required
                        />

                        <div>Email</div>
                        <input
                            type="text"
                            name="email"
                            value={customer.email}
                            onChange={handleChange}
                        />

                        <div>Phone Number</div>
                        <input
                            type="number"
                            name="phone"
                            value={customer.phone}
                            onChange={handleChange}
                            required
                        />

                        <div>Address</div>
                        <input
                            type="text"
                            name="address"
                            value={customer.address}
                            onChange={handleChange}
                            required
                        />
                    </form>
                </div>
                <div className={styles.billRight}>
                    <table className={styles.billTable}>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id}>
                                    <td className={styles.billProductCell}>
                                        <img src={item.thumbnail} alt="" />
                                        <span>{item.title}</span>
                                    </td>
                                    <td>{item.price.toLocaleString()} x {item.quantity}</td>
                                    <td><strong>{(item.price * item.quantity).toLocaleString()}$</strong></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3>Total: {total.toLocaleString()}$</h3>
                    <button className={styles.billBtn} onClick={handlePlaceOrder}>PLACE ORDER</button>
                </div>
            </div>

        </>
    )
}

export default Bill