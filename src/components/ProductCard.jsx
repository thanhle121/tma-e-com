function ProductCard({ product, addToCart }){
    return(
        <>
        <div className="card-wrapper">
            <img src={product.thumbnail} alt="" />
            <h3>{product.title}</h3>
            <p className="card-desc">{product.description.slice(0,60)}...</p>
            <div className="card-bt">
                <p className="card-price">{product.price}$</p>
                <button className="card-btn" onClick={()=>addToCart(product)}>ADD TO CART</button>
            </div>
        </div>
        </>
    )
}

export default ProductCard