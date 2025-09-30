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