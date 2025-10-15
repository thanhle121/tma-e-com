import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext()

export function CartProvider({ children }){
        const [cart, setCart] = useState([])
    
        const addToCart = (product) => {
            setCart(prev =>{
                const exist = prev.find(item => item.id === product.id)
                if(exist){
                    return prev.map((item)=>(
                        item.id === product.id ? {...item, quantity: item.quantity + product.quantity}:item
                    ))
                }    
                // return [...prev, {...product, quantity: 1}]
                return [...prev, { ...product }]
            }
            )
        }

        const deleteItem = (id) => {
            setCart(prev => prev.filter(item => item.id !== id))
        }

        const cartCount = cart.reduce((total, item)=>total + item.quantity, 0)

        return(
            <CartContext.Provider value={{ cart, addToCart, cartCount, deleteItem, setCart }}>
                { children }
            </CartContext.Provider>
        )
}
