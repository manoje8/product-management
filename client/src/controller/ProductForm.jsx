import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../store/context';
import axios from 'axios'; // Import axios for API calls

const ProductForm = () => {
  const { editId } = useContext(ProductContext);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: '',
    description: '',
    status: false,
    basePrice: '',
    discount: '',
    tax: '',
    stockQuantity: '',
    minOrderQuantity: '',
    restock: '',
    images: [],
    specifications: [],
  });

  // Fetch product details if editId is present
  useEffect(() => {
    if (editId) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/products/${editId}`);
          const product = res.data;
          setFormData({
            name: product.name,
            code: product.code,
            category: product.category,
            description: product.description,
            status: product.status,
            basePrice: product.basePrice,
            discount: product.discount,
            tax: product.tax,
            stockQuantity: product.stockQuantity,
            minOrderQuantity: product.minOrderQuantity,
            restock: product.restock,
            images: product.images || [],
            specifications: product.specifications || [],
          });
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [editId]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      images: [...e.target.files], // Store the selected files
    });
  };

  const handleSpecificationChange = (e, index, field) => {
    const newSpecifications = [...formData.specifications];
    newSpecifications[index][field] = e.target.value;
    setFormData({
      ...formData,
      specifications: newSpecifications,
    });
  };

  const addSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { key: '', value: '' }],
    });
  };

  const handleSubmit = async () => {
    const formPayload = new FormData();

    // Append all form fields to the FormData object
    formPayload.append('name', formData.name);
    formPayload.append('code', formData.code);
    formPayload.append('category', formData.category);
    formPayload.append('description', formData.description);
    formPayload.append('status', formData.status);
    formPayload.append('basePrice', formData.basePrice);
    formPayload.append('discount', formData.discount);
    formPayload.append('tax', formData.tax);
    formPayload.append('stockQuantity', formData.stockQuantity);
    formPayload.append('minOrderQuantity', formData.minOrderQuantity);
    formPayload.append('restock', formData.restock);
    formPayload.append('specifications', JSON.stringify(formData.specifications));

    // Append each image file to the FormData object
    formData.images.forEach((image) => {
      formPayload.append('images', image);
    });

    try {
      let response;
      if (editId) {
        // Update existing product
        response = await axios.put(`http://localhost:8000/api/products/${editId}`, formPayload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Create new product
        response = await axios.post('http://localhost:8000/api/products', formPayload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      if (response.status === 200 || response.status === 201) {
        console.log('Product saved successfully:', response.data);
        alert(`Product ${editId ? 'updated' : 'added'} successfully!`);
        navigate('/');
      } else {
        throw new Error('Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error.message);
      alert(`Failed to ${editId ? 'update' : 'add'} product. Please try again.`);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>Basic Details</h2>
            <div>
              <label>Product Name*</label>
              <input
                type="text"
                name="name"
                className="form-control form-control-sm"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter the product name"
                required
              />
            </div>
            <div>
              <label>SKU/Product Code*</label>
              <input
                type="text"
                name="code"
                className="form-control form-control-sm"
                value={formData.code}
                onChange={handleChange}
                placeholder="Enter the unique product code"
                required
              />
            </div>
            <div>
              <label>Category*</label>
              <select
                name="category"
                className="form-control form-control-sm"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home</option>
              </select>
            </div>
            <div>
              <label>Description*</label>
              <textarea
                name="description"
                className="form-control form-control-sm"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter the description"
                required
              />
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                />
                Product Active
              </label>
            </div>
            <div className="py-2">
              <button className="btn btn-sm btn-dark" type="button" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Pricing & Inventory</h2>
            <div>
              <label>Base Price*</label>
              <select
                name="basePrice"
                className="form-control form-control-sm"
                value={formData.basePrice}
                onChange={handleChange}
                required
              >
                <option value="">Select currency</option>
                <option value="USD">USD</option>
                <option value="INR">INR</option>
                <option value="EU">EU</option>
              </select>
            </div>
            <div>
              <label>Discount Price (Optional)</label>
              <input
                type="number"
                name="discount"
                className="form-control form-control-sm"
                value={formData.discount}
                onChange={handleChange}
                placeholder="0.0"
              />
            </div>
            <div>
              <label>Tax Rate (%)</label>
              <input
                type="number"
                name="tax"
                value={formData.tax}
                className="form-control form-control-sm"
                onChange={handleChange}
                placeholder="Enter the tax rate"
              />
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <label>Stock Quantity*</label>
                <input
                  type="number"
                  name="stockQuantity"
                  className="form-control form-control-sm"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  required
                />
              </div>
              <div>
                <label>Minimum Order Quantity</label>
                <input
                  type="number"
                  name="minOrderQuantity"
                  className="form-control form-control-sm"
                  value={formData.minOrderQuantity}
                  onChange={handleChange}
                  placeholder="Enter minimum quantity"
                />
              </div>
            </div>
            <div>
              <label>Restocking time (Days)</label>
              <input
                type="number"
                name="restock"
                className="form-control form-control-sm"
                value={formData.restock}
                onChange={handleChange}
                placeholder="Enter the days"
              />
            </div>
            <div className="py-2">
              <button className="btn btn-sm btn-dark m-2" type="button" onClick={prevStep}>
                Previous
              </button>
              <button className="btn btn-sm btn-dark" type="button" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Media</h2>
            <div>
              <label>Product Images</label>
              <input
                type="file"
                name="images"
                className="form-control form-control-sm"
                onChange={handleFileChange}
                multiple
              />
            </div>
            <div className="py-2">
              <button className="btn btn-sm btn-dark m-2" type="button" onClick={prevStep}>
                Previous
              </button>
              <button className="btn btn-sm btn-dark" type="button" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2>Specifications</h2>
            {formData.specifications.map((spec, index) => (
              <div key={index} className="d-flex justify-content-between">
                <input
                  type="text"
                  value={spec.key}
                  className="form-control form-control-sm"
                  onChange={(e) => handleSpecificationChange(e, index, 'key')}
                  placeholder="Specification (e.g., Color)"
                />
                <input
                  type="text"
                  value={spec.value}
                  className="form-control form-control-sm"
                  onChange={(e) => handleSpecificationChange(e, index, 'value')}
                  placeholder="Value (e.g., Blue)"
                />
              </div>
            ))}
            <button className="btn btn-sm btn-dark my-2" type="button" onClick={addSpecification}>
              Add Specification
            </button>
            <div className="py-2">
              <button className="btn btn-sm btn-dark m-2" type="button" onClick={prevStep}>
                Previous
              </button>
              <button className="btn btn-sm btn-dark m-2" type="button" onClick={nextStep}>
                Next
              </button>
              <button className="btn btn-sm btn-dark" type="button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  return <div className="container" style={{ width: '600px' }}>{renderStep()}</div>;
};

export default ProductForm;