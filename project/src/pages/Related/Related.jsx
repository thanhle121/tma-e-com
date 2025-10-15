import { useNavigate, useParams } from 'react-router'
import './Related.css'
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
    

    if (loading) return <p>Đang tải sản phẩm...</p>;
    if (!product) return <p>Sản phẩm không tồn tại!</p>;
    
    return(
        <>
            {product && (
                <>
                <div className='product-path'>
                    <span onClick={()=>navigate('/')} className="">Products</span> / 
                    <span className="path-category"><strong> {params.categoryName}</strong></span>
                </div>

                <RelatedProducts products={product}/>
                </>
            )}
        </>
    )
}

export default Related