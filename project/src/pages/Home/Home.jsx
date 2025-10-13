import { useContext, useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import { CartContext } from "../../context/CartProvider/CartProvider"
import './Home.css'
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
        <div className="home-top">
            <div className="home-top-left">
                <ul>
                    <li><span><span className="danh-muc">Danh mục 1</span><RightOutlined />
                        <div className="submenu">
                            <ul>
                                <li><Link to="/category/beauty">Beauty</Link></li>
                                <li><Link to="/category/groceries">Groceries</Link></li>
                                <li><Link to="/category/fragrances">Fragrances</Link></li>
                                <li><Link to="/category/furniture">Furniture</Link></li>
                            </ul>
                        </div>
                    </span></li>
                    <li><span><span className="danh-muc">Danh mục 2</span><RightOutlined />
                        <div className="submenu">
                            <ul>
                                <li><Link to="/category/beauty">Beauty</Link></li>
                                <li><Link to="/category/groceries">Groceries</Link></li>
                                <li><Link to="/category/fragrances">Fragrances</Link></li>
                                <li><Link to="/category/furniture">Furniture</Link></li>
                            </ul>
                        </div>
                    </span></li>
                    <li><span><span className="danh-muc">Danh mục 3</span><RightOutlined />
                        <div className="submenu">
                            <ul>
                                <li><Link to="/category/beauty">Beauty</Link></li>
                                <li><Link to="/category/groceries">Groceries</Link></li>
                                <li><Link to="/category/fragrances">Fragrances</Link></li>
                                <li><Link to="/category/furniture">Furniture</Link></li>
                            </ul>
                        </div>
                    </span></li>
                    <li><span><span className="danh-muc">Danh mục 4</span><RightOutlined />
                        <div className="submenu">
                            <ul>
                                <li><Link to="/category/beauty">Beauty</Link></li>
                                <li><Link to="/category/groceries">Groceries</Link></li>
                                <li><Link to="/category/fragrances">Fragrances</Link></li>
                                <li><Link to="/category/furniture">Furniture</Link></li>
                            </ul>
                        </div>
                    </span></li>
                    <li><span><span className="danh-muc">Danh mục 5</span><RightOutlined />
                        <div className="submenu">
                            <ul>
                                <li><Link to="/category/beauty">Beauty</Link></li>
                                <li><Link to="/category/groceries">Groceries</Link></li>
                                <li><Link to="/category/fragrances">Fragrances</Link></li>
                                <li><Link to="/category/furniture">Furniture</Link></li>
                            </ul>
                        </div>
                    </span></li>
                </ul>
            </div>
            <div className="home-top-right" >
                <Carousel autoplay>
                    <div>
                        <img src={banner1} alt="" style={{ width: "100%", height: "400px", objectFit: "cover"}}/>
                    </div>
                    <div>
                        <img src={banner2} alt="" style={{ width: "100%", height: "400px", objectFit: "cover"}}/>
                    </div>
                    <div>
                        <img src={banner3} alt="" style={{ width: "100%", height: "400px", objectFit: "cover"}}/>
                    </div>
                </Carousel>
            </div>
        </div>
        <div className="home-title">
            <div className="home-title-box"></div>
            <div className="home-title-title">Sản phẩm sale</div>
            <div className="home-title-icon">
                <LeftCircleOutlined onClick={handlePrev}/>
                <RightCircleOutlined onClick={handleNext}/>
            </div>
        </div>

        <div className="home-list-sale">
            {visibleProducts.map((p)=>(
                <div key={p.id} className='sale-products'>
                    <div className="discount-badge">{p.discountPercentage}%</div>
                    <ProductCard onClick={()=>handlePDetail(p.id)} key={p.id} product={p} addToCart={handleAddToCart}/>
                </div>
            ))}
        </div>

        <div>
            <img src={bannerBot} alt="" style={{ width: "100%", height: "400px", objectFit: "cover", marginTop: 40}}/>
        </div>

        <div className="home-title">
            <div className="home-title-box"></div>
            <div className="home-title-title">Danh sách sản phẩm</div>
        </div>
        <div className="home-list">
            {filteredProducts.slice(0, visibleCount).map((p)=>(
                <ProductCard onClick={()=>handlePDetail(p.id)} key={p.id} product={p} addToCart={handleAddToCart}/>
            ))}
        </div>

        <div className="btn-line">
            {visibleCount < filteredProducts.length &&(
                <button className="btn-more"
                onClick={()=>{setVisibleCount(prev=>prev+8)}}
                >Xem thêm</button>
            )}

            {visibleCount > 8 &&(
                <button className="btn-less"
                onClick={()=>{setVisibleCount(prev=>Math.max(prev-8, 8))}}
                >Rút gọn</button>
            )}
        </div>

        <div className="home-title">
            <div className="home-title-box"></div>
            <div className="home-title-title">Coming Soon...</div>
        </div>
        
        <CoommingSoon />
        </>
    )
}

export default Home