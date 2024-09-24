import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection

import Home from './pages/home';
import About from './pages/About';
import Collection from './pages/collection';
import Contact from './pages/Contact';
import Product from './pages/product';
import Cart1 from './pages/Cart1';
import Login from './pages/login';
import PlaceOrder from './pages/placeorder';
import Orders from './pages/Orders';
import SearchBar from './components/SearchBar';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* <Navbar /> */}
      <SearchBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/Cart1' element={<Cart1 />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        {/* Redirect if user is not authenticated (Example: Add a protected route for orders) */}
        <Route path='/protected-orders' element={<ProtectedRoute element={<Orders />} />} />
      </Routes>
    </div>
  );
};

// Example Protected Route Component
const ProtectedRoute = ({ element }) => {
  // Here you can implement your logic to check if the user is authenticated
  const isAuthenticated = true; // Replace this with actual authentication check

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default App;

