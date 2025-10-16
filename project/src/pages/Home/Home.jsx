import { useContext, useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import { CartContext } from "../../context/CartProvider/CartProvider"
import styles from './Home.module.css'
import toast from "react-hot-toast"
import { RightOutlined, LeftOutlined, LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons"
import { Carousel } from "antd";
import banner1 from '../../assets/bg1.png'
import banner2 from '../../assets/bg2.jpg'
import banner3 from '../../assets/bg3.png'
import bannerBot from '../../assets/bg-bot.webp'
import { Link, useNavigate, useParams } from "react-router-dom"
import { SearchContext } from "../../context/SearchProvider/SearchProvider"
import { fetchProducts } from "../../service/productService"
import { CoommingSoon } from "../../components/CommingSoon/CoommingSoon"


function Home(){
    const { searchTerm } = useContext(SearchContext)
    const { addToCart } = useContext(CartContext)
    const { categoryName } = useParams()
    const [products, setProducts] = useState([])
    const [visibleCount, setVisibleCount] = useState(8)
    const [ currentIndex, setCurrentIndex ] = useState(0)
    const navigate = useNavigate()

    const handleAddToCart = (product)=>{
         const priceDiscount =
            product.price - (product.price * product.discountPercentage) / 100;

        const finalPrice =
            product.discountPercentage >= 12
            ? Number(priceDiscount.toFixed(2))
            : Number(product.price);

        const productToAdd = {
            ...product,
            price: finalPrice,
            quantity: 1,
        };
        addToCart(productToAdd)

        // addToCart(product)
        toast.success(`${product.title} đã thêm vào giỏ hàng`)
    }

    useEffect(()=>{
        fetchProducts().then(setProducts)
    }, [])

    const filteredProducts = products
        .filter((p)=>
            p.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((p)=>
            categoryName ? p.category === categoryName : true
        )

    const discountProduct = filteredProducts.filter(p => p.discountPercentage >= 12)
    
    const totalSlides = Math.ceil(discountProduct.length / 4)

    const handleNext = () => {
        if (currentIndex < totalSlides - 1) 
            setCurrentIndex(prev => prev + 1)
    }

    const handlePrev = () => {
        if (currentIndex > 0)
            setCurrentIndex(prev => prev - 1)
    }

    const visibleProducts = discountProduct.slice(currentIndex * 4, currentIndex * 4 + 4)

    const handlePDetail = (id) => {
        navigate(`/products/${id}`)
    }

    return(
        <>
            <div className={styles.homeTop}>
                <div className={styles.homeTopLeft}>
                    <ul>
                        {[1, 2, 3, 4, 5].map(i => (
                            <li key={i}>
                                <span>
                                    <span className={styles.danhMuc}>Danh mục {i}</span>
                                    <RightOutlined />
                                    <div className={styles.submenu}>
                                        <ul>
                                            <li><Link to="/related/beauty">Beauty</Link></li>
                                            <li><Link to="/related/groceries">Groceries</Link></li>
                                            <li><Link to="/related/fragrances">Fragrances</Link></li>
                                            <li><Link to="/related/furniture">Furniture</Link></li>
                                        </ul>
                                    </div>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.homeTopRight}>
                    <Carousel autoplay>
                        {[banner1, banner2, banner3].map((b, i) => (
                            <div key={i}>
                                <img src={b} alt="" style={{ width: "100%", height: "400px", objectFit: "cover" }} />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>

            <div className={styles.homeTitle}>
                <div className={styles.homeTitleBox}></div>
                <div className={styles.homeTitleTitle}>Sản phẩm sale</div>
                <div className={styles.homeTitleIcon}>
                    <LeftCircleOutlined onClick={handlePrev} />
                    <RightCircleOutlined onClick={handleNext} />
                </div>
            </div>

            <div className={styles.homeListSale}>
                {visibleProducts.map((p) => (
                    <div key={p.id} className={styles.saleProducts}>
                        <div className={styles.discountBadge}>{p.discountPercentage}%</div>
                        <ProductCard onClick={() => handlePDetail(p.id)} product={p} addToCart={handleAddToCart} />
                    </div>
                ))}
            </div>

            <div>
                <img src={bannerBot} alt="" style={{ width: "100%", height: "400px", objectFit: "cover", marginTop: 40 }} />
            </div>

            <div className={styles.homeTitle}>
                <div className={styles.homeTitleBox}></div>
                <div className={styles.homeTitleTitle}>Danh sách sản phẩm</div>
            </div>

            <div className={styles.homeList}>
                {filteredProducts.slice(0, visibleCount).map((p) => (
                    <ProductCard onClick={() => handlePDetail(p.id)} key={p.id} product={p} addToCart={handleAddToCart} />
                ))}
            </div>

            <div className={styles.btnLine}>
                {visibleCount < filteredProducts.length && (
                    <button className={styles.btnMore} onClick={() => setVisibleCount(prev => prev + 8)}>Xem thêm</button>
                )}
                {visibleCount > 8 && (
                    <button className={styles.btnLess} onClick={() => setVisibleCount(prev => Math.max(prev - 8, 8))}>Rút gọn</button>
                )}
            </div>

            <div className={styles.homeTitle}>
                <div className={styles.homeTitleBox}></div>
                <div className={styles.homeTitleTitle}>Coming Soon...</div>
            </div>

            <CoommingSoon />
        </>
    )
}

export default Home