import { useContext, useMemo, useState } from "react"
import ProductList from "./ProductList"
import { ProductContext } from "../store/context"
import axios from "axios"
import { Link } from "react-router-dom"

const Product = () => {
    const { products, load} = useContext(ProductContext)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchOption, setSearchOption] = useState("name")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const searchProduct = useMemo(() => {
        return products.filter(product => 
            product[searchOption]?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm, searchOption]);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
    
        if (selectedFile) {
          setLoading(true);
          const formData = new FormData();
          formData.append('file', selectedFile);
    
          try 
          {
            // Send POST request to the server
            await axios.post('http://localhost:8000/api/products/bulk-upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            setLoading(false);
            alert('File uploaded successfully!');
          } catch (error) 
          {
            setLoading(false);
            setError('Error uploading file');
            console.error('Error uploading file:', error);
          }
        }
    };

    return (
        <div className="mt-5">
            {load ? "Loading...": ""}
            <section className="d-flex justify-content-between">
                <div className="d-flex gap-2">
                    <input className="form-control form-control-sm"  placeholder="search" type="text" onChange={(e) => setSearchTerm(e.target.value)}/>
                    <span className="d-flex mx-2">
                        <select className="form-select form-select-sm" style={{width: "120px"}} value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
                            <option value="name">Name</option>
                            <option value="category">Category</option>
                            <option value="code">SKU</option>
                        </select>
                    </span>
                </div>
                <div>
                    <input type="file" className="btn btn-sm btn-light mx-2"
                        onChange={handleFileChange}
                        placeholder="Bulk upload"
                    />
                    <Link to="/add" className="btn btn-sm btn-dark">Add Product</Link>
                </div>
            </section>
            <section>
                {loading && <p>Uploading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </section>
            <section>
                <ProductList products={searchProduct}/>
            </section>
        </div>
    )
}

export default Product