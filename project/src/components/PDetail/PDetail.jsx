import { useContext, useEffect, useState } from 'react'
import styles from './PDetail.module.css'
import { InputNumber, Rate } from 'antd'
import { RetweetOutlined, TruckOutlined } from '@ant-design/icons'
import { CartContext } from '../../context/CartProvider/CartProvider'
import toast from 'react-hot-toast'
import { getCookie } from '../../helpers/cookie'
import { useNavigate } from 'react-router'

export const PDetail = ({ product }) => {
    const navigate = useNavigate()
    const { addToCart } = useContext(CartContext)
    const priceDiscount = product.price - (product.price * product.discountPercentage)/100
    const [quantity, setQuantity] = useState(1)
    const [ selectedImage, setSelectedImage ] = useState(product?.images?.[0])

    useEffect(()=>{
        if(product?.images?.[0])
            setSelectedImage(product.images[0])
    }, [product])

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
        toast.success(`${product.title} đã thêm vào giỏ hàng`)

    }

    const handleBuyNow = () => {
        const email = getCookie('email')
        if(email){
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
            navigate('/cart')
        } else {
            toast(()=>(
                <span>Bạn chưa đăng nhập! Hãy <a href="/signin" style={{color: 'red'}}><strong>ĐĂNG NHẬP</strong></a> để mua hàng.</span>
            ))
        }
    }

    return(
        <>
        {product && (
            <>
            <div className={styles.pDetailWrapper}>
                <div className={styles.pLeft}>
                    {product.images.map((item, index)=>(
                        <img key={index} src={item} alt="" onClick={()=>setSelectedImage(item)}
                        className={item===selectedImage ? styles.activeThumb : ''}
                        />
                    ))}
                </div>
                <div className={styles.pMain}><img src={selectedImage} alt="" /></div>
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
                    <div>
                        <p><strong>Brand: </strong> {product.brand ? product.brand : 'Unknown'}</p>
                    </div>
                    <hr />
                    <div className={styles.pRightStock}>
                        <span>Quantity:  </span>
                        <InputNumber min={1} max={product.stock} value={quantity} onChange={value => setQuantity(value)}/>
                    </div>
                    <div className={styles.pRightBtn}>
                        <button className={styles.pRightBuy} onClick={handleBuyNow}>BUY NOW</button>
                        <button className={styles.pRightAdd} onClick={handleAdd}>ADD TO CART</button>
                    </div>
                    <div className={styles.pRightTable}>
                        <div className={styles.pRightRow}>
                            <div><TruckOutlined /></div>
                            <div className={styles.pRightRight}>
                                <div>Free Shipping</div>
                                <div>{product.shippingInformation}</div>
                            </div>
                        </div>
                        <div className={styles.pRightRow}>
                            <div><RetweetOutlined /></div>
                            <div className={styles.pRightRight}>
                                <div>Warranty</div>
                                <div>{product.warrantyInformation}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )}
        </>
    )
}