import { useContext, useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { CartContext } from "../context/CartContext"
import './Home.css'
import toast from "react-hot-toast"
import { RightOutlined } from "@ant-design/icons"
import { Carousel } from "antd";
import banner1 from '../assets/bg1.png'
import banner2 from '../assets/bg2.jpg'
import banner3 from '../assets/bg3.png'

function Home(){
    const [products, setProducts] = useState([])
    const { addToCart } = useContext(CartContext)

    const handleAddToCart = (product)=>{
        addToCart(product)
        toast.success(`${product.title} đã thêm vào giỏ hàng`)
    }

    useEffect(()=>{
        fetch('https://dummyjson.com/products')
        .then(res=>res.json())
        .then(data=>setProducts(data.products))
        .catch(err=>console.log('Failed: ', err))
    }, [])

    return(
        <>
        <div className="home-top">
            <div className="home-top-left">
                <ul>
                    <li><span><span className="danh-muc">Danh mục 1</span><RightOutlined />
                        <div className="submenu">
                            <ul>
                                <li>Đề mục con 1</li>
                                <li>Đề mục con 2</li>
                                <li>Đề mục con 3</li>
                                <li>Đề mục con 4</li>
                            </ul>
                        </div>
                    </span></li>
                    <li><span><span className="danh-muc">Danh mục 2</span><RightOutlined />
                        <div className="submenu">
                            <ul>
                                <li>Đề mục con 1</li>
                                <li>Đề mục con 2</li>
                                <li>Đề mục con 3</li>
                                <li>Đề mục con 4</li>
                            </ul>
                        </div>
                    </span></li>
                    <li><span><span className="danh-muc">Danh mục 3</span><RightOutlined />
                        <div className="submenu">
                            <ul>
                                <li>Đề mục con 1</li>
                                <li>Đề mục con 2</li>
                                <li>Đề mục con 3</li>
                                <li>Đề mục con 4</li>
                            </ul>
                        </div>
                    </span></li>
                    <li><span><span className="danh-muc">Danh mục 4</span><RightOutlined />
                        <div className="submenu">
                            <ul>
                                <li>Đề mục con 1</li>
                                <li>Đề mục con 2</li>
                                <li>Đề mục con 3</li>
                                <li>Đề mục con 4</li>
                            </ul>
                        </div>
                    </span></li>
                    <li><span><span className="danh-muc">Danh mục 5</span><RightOutlined />
                        <div className="submenu">
                            <ul>
                                <li>Đề mục con 1</li>
                                <li>Đề mục con 2</li>
                                <li>Đề mục con 3</li>
                                <li>Đề mục con 4</li>
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
            {products.map((p)=>(
                <ProductCard key={p.id} product={p} addToCart={handleAddToCart}/>
            ))}
        </div>
        </>
    )
}

export default Home