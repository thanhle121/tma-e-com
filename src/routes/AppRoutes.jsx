import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import SignIn from "../pages/Sign/SignIn";
import AuthLayout from "../layout/AuthLayout";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import Register from "../pages/Sign/Register";

function AppRoutes(){
    return(
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path="/" element={<Home />}/>
                <Route path="/category/:categoryName" element={<Home />}/>
                <Route path="/cart" element={<Cart />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/about" element={<About />}/>
            </Route>
            
            <Route element={<AuthLayout />}>
                <Route path="/signin" element={<SignIn />}/>
                <Route path="/register" element={<Register />}></Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes