import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../../service/productService";
import { PDetail } from "../../components/PDetail/PDetail";
import './ProductDetail.css'
import { RelatedProduct } from "../../components/RelatedProduct/RelatedProduct";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (err) {
                console.error("Lỗi fetch:", err);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, []);

    if (loading) return <p>Đang tải sản phẩm...</p>;
    if (!product) return <p>Sản phẩm không tồn tại!</p>;

    return (
        <>
            <div className='product-path'>
                <span onClick={()=>navigate('/')} className="">Products</span> / 
                <span className="path-category">{product.category}</span>  / 
                <strong>{product.title}</strong>
            </div>
            <PDetail product={product} />
            <div className="related-title">
                <div className="related-box"></div>
                <div className="related-text">Related Product</div>
            </div>
            <RelatedProduct />
        </>
    );
}

export default ProductDetail;
