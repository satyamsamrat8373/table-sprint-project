import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router'
import Header from './components/header'
import Sidebar from './components/sidebar'
import Login from './components/login'
import Forgot from './components/register'
import Home from './components/Home'
import Category from './components/category'
import AddCategory from './components/addCategory'
import EditCategory from './components/editCategory'
import SubCategory from './components/subcategory'
import AddSubCategory from './components/addSubcategory'
import EditSubCategory from './components/editSubCategory'
import Product from './components/product'
import AddProduct from './components/addProduct'
import EditProduct from './components/editProduct'
import ProductDetails from './components/productDetails'
import Protected from './components/protected'
function App() {
  return (
    <BrowserRouter>
      {/* Only show Header and Sidebar if not on login/register routes */}
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/sign-up' element={<Forgot />}/>
        <Route path='*' element={
          <Protected>
            <>
              <Header />
              <div className='flex'>
                <Sidebar />
                <div className='flex-1'>
                  <Routes>
                    <Route path='/dashboard' element={<Home />} />
                    <Route path='/category' element={<Category />} />
                    <Route path='/add-category' element={<AddCategory />} />
                    <Route path='/edit-category/:id' element={<EditCategory />} />
                    <Route path='/subcategory' element={<SubCategory />} />
                    <Route path='/add-subcategory' element={<AddSubCategory />} />
                    <Route path='/edit-subcategory/:id' element={<EditSubCategory />} />
                    <Route path='/products' element={<Product />} />
                    <Route path='/add-product' element={<AddProduct />} />
                    <Route path='/edit-product/:id' element={<EditProduct />} />
                    <Route path='/view-product/:id' element={<ProductDetails />} />
                  </Routes>
                </div>
              </div>
            </>
          </Protected>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
