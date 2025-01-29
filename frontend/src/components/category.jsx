import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch categories from backend
  const fetchCategories = async (query = '') => {
    try {
      const response = await fetch(`http://localhost:5000/api/category?q=${query}`,{
        headers:{
          'Authorization': `${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Delete category handler
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/category/${id}`, {
          method: 'DELETE',
          headers:{
           'Authorization': `${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (!data.error) {
          fetchCategories(); // Refresh the list
        }
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchCategories(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="grid-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <h2 className="text-xl">Category</h2>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="search"
            placeholder="Search..."
            className="px-4 py-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={() => navigate('/add-category')} 
            className="bg-purple-600 text-white px-4 py-2 rounded-md"
          >
            Add Category
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-yellow-100">
            <tr>
              <th className="px-4 py-3 text-left">Id</th>
              <th className="px-4 py-3 text-left">Category name</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Sequence</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category,index) => (
              <tr key={category.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{category.Id}</td>
                <td className="px-4 py-3">{category.Category_name}</td>
                <td className="px-4 py-3">
                  <img
                    src={category.Image}
                    alt={category.Category_name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded ${
                      category.Status === 'INACTIVE'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {category.Status}
                  </span>
                </td>
                <td className="px-4 py-3">{index+1}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigate(`/edit-category/${category.Id}`)} 
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(category.Id)}
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

export default Category;


