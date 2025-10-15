import ProductCard from "../ProductCard/ProductCard"
import styles from './RelatedProducts.module.css'

export const RelatedProducts = ({ products, onProductClick }) => {
    if(!products || products.length == 0){
        <p>Không có sản phẩm nào.</p>
    }

    
    return(
        <>
        {products && (
            <>
            <div className={styles.relatedProducts}>
                {products.map((p)=>(
                    <div key={p.id} className={styles.relatedProductsItem}>
                        {p.discountPercentage >= 12 &&(
                            <div className={styles.discountBadge}>{p.discountPercentage}%</div>
                        )}
                        <ProductCard product={p} onClick={()=>onProductClick(p.id)} showAddToCart={false} />
                    </div>
                ))}
            </div>
            </>
        )}
        </>
    )
}