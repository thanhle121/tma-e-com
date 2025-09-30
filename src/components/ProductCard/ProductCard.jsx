import styles from './ProductCard.module.css'

function ProductCard({ product, addToCart }){
    return(
        <>
        <div className={styles.cardWrapper}>
            <img src={product.thumbnail} alt="" />
            <h3>{product.title}</h3>
            <p className={styles.cardDesc}>{product.description.slice(0,60)}...</p>
            <div className={styles.cardBt}>
                <p className={styles.cardPrice}>{product.price}$</p>
                <button className={styles.cardBtn} onClick={()=>addToCart(product)}>ADD TO CART</button>
            </div>
        </div>
        </>
    )
}

export default ProductCard