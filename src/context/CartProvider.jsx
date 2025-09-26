import { useState } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }){
        const [cart, setCart] = useState([])
    
        const addToCart = (product) => {
            setCart(prev =>{
                const exist = prev.find(item => item.id === product.id)
                if(exist){
                    return prev.map((item)=>(
                        item.id === product.id ? {...item, quantity: item.quantity + 1}:item
                    ))
                }    
                return [...prev, {...product, quantity: 1}]
            }
            )
        }

        const cartCount = cart.reduce((total, item)=>total + item.quantity, 0)

        return(
            <CartContext.Provider value={{ cart, addToCart, cartCount }}>
                { children }
            </CartContext.Provider>
        )
}