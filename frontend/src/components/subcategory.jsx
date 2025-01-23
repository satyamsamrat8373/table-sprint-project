import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SubCategory = () => {
  const navigate = useNavigate();
  const [subCategories, setSubCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch sub-categories from backend
  const fetchSubCategories = async (query = '') => {
    try {
      console.log('Fetching sub-categories...');
      const response = await fetch(`http://localhost:5000/api/sub_Category?q=${query}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received data:', data);
      setSubCategories(data.data || []);
    } catch (error) {
      console.error('Error fetching sub-categories:', error);
      setSubCategories([]);
    }
  };

  // Delete sub-category handler
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sub-category?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/sub_Category/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.error) {
          fetchSubCategories();
        }
      } catch (error) {
        console.error('Error deleting sub-category:', error);
      }
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchSubCategories();
  }, []);

  // Handle search with debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchSubCategories(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        {/* ... existing header code ... */}
        <div className="flex items-center gap-4">
          <input
            type="search"
            placeholder="Search..."
            className="px-4 py-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={() => navigate('/add-subcategory')} 
            className="bg-purple-600 text-white px-4 py-2 rounded-md"
          >
            Add Sub Category
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-yellow-100">
            <tr>
              <th className="px-4 py-3 text-left">Id</th>
              <th className="px-4 py-3 text-left">Sub Category name</th>
              <th className="px-4 py-3 text-left">Category name</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Sequence</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map((subCategory, index) => (
              <tr key={subCategory.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{subCategory.Id}</td>
                <td className="px-4 py-3">{subCategory.sub_category_name}</td>
                <td className="px-4 py-3">{subCategory.Category_name}</td>
                <td className="px-4 py-3">
                  <img
                    src={subCategory.Image}
                    alt={subCategory.sub_category_name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded ${
                      subCategory.Status === 'ACTIVE'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {subCategory.Status}
                  </span>
                </td>
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigate(`/edit-subcategory/${subCategory.Id}`)} 
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(subCategory.Id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubCategory;