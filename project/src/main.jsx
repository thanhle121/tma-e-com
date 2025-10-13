import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'antd/dist/reset.css'
import { CartProvider } from './context/CartProvider/CartProvider.jsx'
import { SearchProvider } from './context/SearchProvider/SearchProvider.jsx'
import { AuthProvider } from './context/AuthProvider/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
    <CartProvider>
        <SearchProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </SearchProvider>
    </CartProvider>
)
