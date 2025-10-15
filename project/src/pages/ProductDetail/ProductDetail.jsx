import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById, fetchProductsByCategory } from "../../service/productService";
import { PDetail } from "../../components/PDetail/PDetail";
import './ProductDetail.css'
import { RelatedProducts } from "../../components/RelatedProduct/RelatedProducts";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [related, setRelated] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await fetchProductById(id);
                setProduct(data);

                const relatedData = await fetchProductsByCategory(data.category)
                const filterRelated = relatedData.filter(p => p.id !== Number(id))
                setRelated(filterRelated)
            } catch (err) {
                console.error("Lỗi fetch:", err);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    if (loading) return <p>Đang tải sản phẩm...</p>;
    if (!product) return <p>Sản phẩm không tồn tại!</p>;

    const totalSlides = Math.ceil(related.length / 4);
    const handleNext = () => {
        if (currentIndex < totalSlides - 1) setCurrentIndex((prev) => prev + 1);
    };
    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
    };

    const visibleProducts = related.slice(currentIndex * 4, currentIndex * 4 + 4);

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`)
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

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
                <div className='related-icon'>
                    <LeftCircleOutlined onClick={handlePrev} />
                    <RightCircleOutlined onClick={handleNext} />
                </div>
            </div>
            <RelatedProducts products={visibleProducts} onProductClick={handleProductClick} showAddToCart={false}/>
        </>
    );
}

export default ProductDetail;
