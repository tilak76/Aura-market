import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Stores from './pages/Stores';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './components/UI/Cart';

function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <Cart />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mens" element={<Shop category="mens" />} />
            <Route path="/womens" element={<Shop category="womens" />} />
            <Route path="/kids" element={<Shop category="kids" />} />
            <Route path="/outdoor" element={<Shop category="outdoor" />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/product" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;
