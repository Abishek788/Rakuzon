import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection

import Home from './pages/home';
import About from './pages/About';
import Collection from './pages/collection';
import Contact from './pages/Contact';
import Cart1 from './pages/Cart1';
import Orders from './pages/Orders';
import SearchBar from './components/SearchBar';
import Admin from './components/admin';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* <Navbar /> */}
      <SearchBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/Cart1' element={<Cart1 />} />
        <Route path='/about' element={<About />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/admin' element={<Admin />} />
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

