import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

export const ProductContext = createContext()

const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const [load, setLoad] = useState(false)
    const [editId, setEditId] = useState(0)

    const fetchProducts = useCallback(async () => {
        try 
        {
            setLoad(true)
            const response = await axios('http://localhost:8000/api/products') 
            if (response) 
            {
                setProducts(response.data) 
            }
        } catch (error) {
            console.log(error);
            
        }
        finally {
            setLoad(false)
        }
    }, [])
    // Effects 
    useEffect(() => {
        fetchProducts()
    }, [fetchProducts]) 
    const context = {
        products,
        load,
        editId,
        setEditId
    }
    return <ProductContext.Provider value={context}>{children}</ProductContext.Provider>
}

export default ProductProvider