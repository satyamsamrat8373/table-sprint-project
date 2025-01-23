import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [productData, setProductData] = useState({
    productName: '',
    category: '',
    subCategory: '',
    status: ''
  });

  // Simulated fetch of product data
  useEffect(() => {
    // Replace this with your actual API call
    const fetchProductData = async () => {
      // Simulated data
      const data = {
        productName: 'Motorola Edge',
        category: 'Motorola',
        subCategory: 'Motorola 10',
        status: 'Active'
      };
      setProductData(data);
    };

    fetchProductData();
  }, [id]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800"
        >
          <IoMdArrowBack size={24} />
        </button>
        <h1 className="text-xl font-semibold">Product Details</h1>
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Product Name */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Product Name:
            </h3>
            <p className="text-base text-gray-900">
              {productData.productName}
            </p>
          </div>

          {/* Category */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Category
            </h3>
            <p className="text-base text-gray-900">
              {productData.category}
            </p>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Status
            </h3>
            <p className={`text-base ${
              productData.status === 'Active' 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {productData.status}
            </p>
          </div>

          {/* Sub Category */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Sub Category
            </h3>
            <p className="text-base text-gray-900">
              {productData.subCategory}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        {/* <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => navigate(`/edit-product/${id}`)}
          className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Save
        </button> */}
      </div>
    </div>
  );
};

export default ProductDetails;
