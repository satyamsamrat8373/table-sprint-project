import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    categoryName: '',
    sequence: '',
    status: 'Active',
    image: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  
  // Simulated fetch of category data
  useEffect(() => {
    // Replace this with your actual API call
    const fetchCategoryData = async () => {
      // Simulated data
      const data = {
        categoryName: 'Tea',
        sequence: '3',
        status: 'Active',
        image: '/path-to-image.jpg'
      };
      setFormData(data);
      setPreviewImage(data.image);
    };

    fetchCategoryData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    // Make API call to update product
    try {
      const response = await fetch(`http://localhost:5000/api/category/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          Category_Name: formData.categoryName,
          sequence: formData.sequence, 
          Status: formData.status,
          Image: formData.image
        })
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.message);
      }

    } catch (error) {
      console.error('Error updating product:', error);
      return; // Prevent navigation on error
    }
    console.log(formData);
    navigate('/category');
  };

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
        <h1 className="text-xl font-semibold">Edit Category</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Name
          </label>
          <input
            type="text"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter category name"
          />
        </div>

        {/* Category Sequence */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Sequence
          </label>
          <input
            type="number"
            name="sequence"
            value={formData.sequence}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter sequence number"
          />
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="relative">
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 appearance-none bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <div className="flex items-start gap-4">
            {/* Image Preview */}
            <div className="w-32 h-32 border-2 border-dashed rounded-lg overflow-hidden">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div className="flex-1">
              <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                Upload image from device
              </label>
              <p className="mt-2 text-sm text-gray-500">
                File size in 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;

