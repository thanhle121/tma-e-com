import { useContext, useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard/ProductCard'
import { getCookie } from '../../helpers/cookie'
import styles from './WishList.module.css'
import toast from 'react-hot-toast'
import { get } from '../../utils/request'
import { useNavigate } from 'react-router'
import { CartContext } from '../../context/CartProvider/CartProvider'

function WishList(){
    const userId = getCookie('id')
    const navigate = useNavigate()
    const { addToCart } = useContext(CartContext)
    const [favProduct, setFavProduct] = useState([])
    const [loading, setLoading] = useState(true)

    const handlePDetail = (id) => {
        navigate(`/products/${id}`)
    }

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
        const fetchFavProducts = async () => {
            try{
                if(!userId){
                    toast('Vui lòng đăng nhập để xem Wish List.')
                return
                }

                const account = await get(`accounts/${userId}`)
                setFavProduct(account.favorites || [])
            } catch (err){
                console.log(err);
                toast.error('Đã có lỗi xảy ra.')
            } finally{
                setLoading(false)
            }
        }

        fetchFavProducts()
    }, [])

    if(loading) return <div>Loading...</div>

    if (favProduct.length === 0) {
        return (
        <div className=''>
            Chưa có sản phẩm yêu thích
        </div>
        );
    }
    return(
        <>
            {favProduct && (
                <div className={styles.favList}>
                {favProduct.map((p)=>(
                    <div key={p.id} className={styles.favListItem}>
                        {p.discountPercentage >= 12 &&(
                            <div className={styles.discountBadge}>{p.discountPercentage}%</div>
                        )}
                        <ProductCard onClick={()=>handlePDetail(p.id)} key={p.id} product={p} addToCart={handleAddToCart}/>
                    </div>
                ))}
                </div>
            )}
        </>
    )
}

export default WishList