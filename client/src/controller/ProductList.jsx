import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../store/context";
import { useContext } from "react";


const ProductList = ({products}) => {
    const { setEditId} = useContext(ProductContext)
    const navigate = useNavigate()

    const handleUpdate = async(id) => {
        setEditId(id)
        navigate("/add")
    }

    const handleDelete = async(id) => {
        try 
        {
            const res = confirm("Are you sure want to delete")
            if(res)
            {

                await axios.delete(`http://localhost:8000/api/products/${id}`)
                alert('Product deleted successfully:');
                navigate("/")
            }
        } catch (error) 
        {
            console.error('Error deleting product:', error.message);
        }
    }

    return (
        <div className="py-4">
            <table className="table table-hover rounded">
                <thead>
                    <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">SKU</th>
                        <th scope="col">Price</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product) => (
                            <tr key={product._id}>
                                <th scope="row">{product.name}</th>
                                <td>{product.category}</td>
                                <td>{product.code}</td>
                                <td>{product.discount}</td>
                                <td>{product.stockQuantity}</td>
                                <td >
                                    <span className={`rounded p-1 ${product.status ? "bg-success" : "bg-danger"}`}>
                                        {product.status ? "active" : "inactive"}
                                        </span>
                                    </td>
                                <td>
                                    <button className="btn btn-sm" onClick={() => handleUpdate(product._id)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-sm" onClick={() => handleDelete(product._id)}>
                                    <i className="bi bi-trash3"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductList
