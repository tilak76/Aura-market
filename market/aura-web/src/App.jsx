import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider } from '../src/context/ShopContext';
import Navbar from '../src/components/Layout/Navbar';
import Footer from '../src/components/Layout/Footer';
import Home from '../src/pages/Home';
import Shop from '../src/pages/Shop';
import Cart from '../src/components/UI/Cart';

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
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;
