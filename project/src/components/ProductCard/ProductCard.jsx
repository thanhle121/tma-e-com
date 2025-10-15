import { EyeOutlined, HeartOutlined } from '@ant-design/icons'
import styles from './ProductCard.module.css'
import { Rate } from 'antd'

function ProductCard({ product, addToCart, onClick, showAddToCart = true }){
    return(
        <>
        <div className={styles.productCard}>
            <div className={styles.cardContainer}>
                <img onClick={onClick} src={product.thumbnail} className={styles.productImage} alt="" />
                <div className={styles.icons}>
                    <HeartOutlined className={styles.icon}/>
                    <EyeOutlined className={styles.icon} />
                </div>
                {showAddToCart && (
                    <button className={styles.cardBtn} onClick={()=>addToCart(product)}>Add to cart</button>
                )}
            </div>
            <h3 className={styles.productTitle}>{product.title}</h3>
            <div className={styles.productRating}>
                <div className={styles.productPrice}>{product.price}$</div>
                <Rate disabled defaultValue={Math.round(product.rating)} />
                <span>({product.stock})</span>
            </div>
        </div>
        </>
    )
}

export default ProductCard