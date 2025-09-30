import { useContext, useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import { CartContext } from "../../context/CartContext"
import './Home.css'
import toast from "react-hot-toast"
import { RightOutlined } from "@ant-design/icons"
import { Carousel } from "antd";
import banner1 from '../../assets/bg1.png'
import banner2 from '../../assets/bg2.jpg'
import banner3 from '../../assets/bg3.png'
import { Link, useParams } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import { fetchProducts } from "../../service/productService"


function Home(){
    const [products, setProducts] = useState([])
    const { searchTerm } = useContext(SearchContext)
    const { addToCart } = useContext(CartContext)
    const [visibleCount, setVisibleCount] = useState(6)
    const { categoryName } = useParams()

    const handleAddToCart = (product)=>{
        addToCart(product)
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
                        <img src={banner1} alt="" style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: '6px' }}/>
                    </div>
                    <div>
                        <img src={banner2} alt="" style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: '6px' }}/>
                    </div>
                    <div>
                        <img src={banner3} alt="" style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: '6px' }}/>
                    </div>
                </Carousel>
            </div>
        </div>
        <h2 className="home-title">Danh sách sản phẩm</h2>
        <div className="home-list">
            {filteredProducts.slice(0, visibleCount).map((p)=>(
                <ProductCard key={p.id} product={p} addToCart={handleAddToCart}/>
            ))}
        </div>

        <div className="btn-line">
            {visibleCount < filteredProducts.length &&(
                <button className="btn-more"
                onClick={()=>{setVisibleCount(prev=>prev+6)}}
                >Xem thêm</button>
            )}

            {visibleCount > 6 &&(
                <button className="btn-less"
                onClick={()=>{setVisibleCount(prev=>Math.max(prev-6, 6))}}
                >Rút gọn</button>
            )}
        </div>
        </>
    )
}

export default Home