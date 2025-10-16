import { useNavigate, useParams } from 'react-router'
import styles from './Related.module.css'
import { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '../../service/productService';
import { RelatedProducts } from '../../components/RelatedProduct/RelatedProducts';

function Related() {
    const params = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const relatedProduct = async () => {
            try{
                const data = await fetchProductsByCategory(params.categoryName)
                setProduct(data)
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false)
            }
        }

        relatedProduct()
    }, [])

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`)
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    

    if (loading) return <p>Đang tải sản phẩm...</p>;
    if (!product) return <p>Sản phẩm không tồn tại!</p>;
    
    return(
        <>
            {product && (
                <>
                <div className={styles.productPath}>
                    <span onClick={()=>navigate('/')} className="">Products</span> / 
                    <span className={styles.pathCategory}><strong> {params.categoryName}</strong></span>
                </div>

                <RelatedProducts products={product} onProductClick={handleProductClick}/>
                </>
            )}
        </>
    )
}

export default Related