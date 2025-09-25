import { useContext, useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { CartContext } from "../context/CartContext"
import './Home.css'
import toast from "react-hot-toast"

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