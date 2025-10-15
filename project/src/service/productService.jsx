export const fetchProducts= async ()=>{
    try{
        const res = await fetch('https://dummyjson.com/products')
        const data = await res.json()
        return data.products
    }
    catch (err){
        console.log('Failed to fetch products, ', err);
        return []
    }
}

export const fetchProductById = async (id) => {
    const products = await fetchProducts()
    const product = products.find(p => p.id === Number(id))
    return product
}


export const fetchProductsByCategory = async (categoryNa) => {
    const products = await fetchProducts()
    const product = products.filter(p=> p.category == categoryNa)
    return product
}