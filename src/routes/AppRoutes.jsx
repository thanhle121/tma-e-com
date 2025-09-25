import { Route, Routes } from "react-router";
import DefaultLayout from "../layout/DefaultLayout";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Contact from "../pages/Contact";
import About from "../pages/About";

function AppRoutes(){
    return(
        <Routes>
            <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/about" element={<About />}/>
            </Route>
        </Routes>
    )
}

export default AppRoutes