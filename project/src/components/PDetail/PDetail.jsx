import { useContext, useState } from 'react'
import styles from './PDetail.module.css'
import { InputNumber, Rate } from 'antd'
import { CartContext } from '../../context/CartProvider/CartProvider'

export const PDetail = ({ product }) => {
    const { addToCart } = useContext(CartContext)
    const priceDiscount = product.price - (product.price * product.discountPercentage)/100
    const [quantity, setQuantity] = useState(1)

    const handleAdd = () => {
        const finalPrice = 
        product.discountPercentage >= 12
            ? priceDiscount.toFixed(2)
            : product.price

        const productToAdd = {
            ...product,
            price: Number(finalPrice),
            quantity: quantity
        }
        addToCart(productToAdd)
    }

    return(
        <>
        {product && (
            <>
            <div className={styles.pDetailWrapper}>
                <div className={styles.pLeft}>
                    {product.images.map((item, index)=>(
                        <img key={index} src={item} alt="" />
                    ))}
                </div>
                <div className={styles.pMain}><img src={product.images[0]} alt="" /></div>
                <div className={styles.pRight}>
                    <div className={styles.pRightTitle}>{product.title}</div>
                    <div className={styles.pRightSpan}>
                        <Rate disabled defaultValue={Math.round(product.rating)} />
                        <span>| In Stock ({product.stock})</span>
                    </div>
                    {product.discountPercentage >= 12 ? (
                        <div className={styles.pRightPrix}><span className={styles.pRightDiscount}>${priceDiscount.toFixed(2)}</span> | 
                        <span className={styles.pRightOld}>${product.price}</span></div>
                    ) : (
                        <div className={styles.pRightPrice}>${product.price}</div>
                    )}
                    <p className={styles.pRightDesc}>{product.description}</p>
                    <hr />
                    <div className={styles.pRightStock}>
                        <span>Quantity:  </span>
                        <InputNumber min={1} max={product.stock} value={quantity} onChange={value => setQuantity(value)}/>
                    </div>
                    <div className={styles.pRightBtn}>
                        <button className={styles.pRightBuy}>BUY NOW</button>
                        <button className={styles.pRightAdd} onClick={handleAdd}>ADD TO CART</button>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                            <td>Hàng 1</td>
                            </tr>
                            <tr>
                            <td>Hàng 2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </>
        )}
        </>
    )
}