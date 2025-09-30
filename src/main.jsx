import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'antd/dist/reset.css'
import { CartProvider } from './context/CartProvider.jsx'
import { SearchProvider } from './context/SearchProvider.jsx'

createRoot(document.getElementById('root')).render(
    <CartProvider>
        <SearchProvider>
            <App />
        </SearchProvider>
    </CartProvider>
)
