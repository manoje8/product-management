import { Route, Routes } from "react-router-dom";
import App from "./App";
import Product from "./controller/Product";
import ProductForm from "./controller/ProductForm";

const AppRouter = () => (
    <App>
        <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/add" element={<ProductForm />} />
        </Routes>
    </App>
)

export default AppRouter