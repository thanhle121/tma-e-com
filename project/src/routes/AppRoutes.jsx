import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout/DefaultLayout";
import SignIn from "../pages/Sign/SignIn";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import Register from "../pages/Register/Register";
import { ChangePassword } from "../pages/ChangePassword/ChangePassword";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Related from "../pages/Related/Related";
import Bill from "../pages/Bill/Bill";
import OrderInfo from "../pages/OrderInfo/OrderInfo";
import WishList from "../pages/WishList/WishList";

function AppRoutes(){
    return(
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path="/" element={<Home />}/>
                {/* <Route path="/category/:categoryName" element={<Home />}/> */}
                <Route path="/cart" element={<Cart />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/related/:categoryName" element={<Related />}/>
                <Route path="/cpass" element={<ChangePassword />}/>
                <Route path="/bill" element={<Bill />}/>
                <Route path="/order" element={<OrderInfo />}/>
                <Route path="/wish-list" element={<WishList />}/>
                <Route path="/products/:id" element={<ProductDetail />}/>
            </Route>
            
            <Route element={<AuthLayout />}>
                <Route path="/signin" element={<SignIn />}/>
                <Route path="/register" element={<Register />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes