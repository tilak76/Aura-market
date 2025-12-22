import React, { createContext, useState, useContext, useEffect } from 'react';
import db from '../db.json';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState({
    mens: [],
    womens: [],
    kids: [],
    accessories: [],
    footwear: []
  });
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Load data from db.json
    // db.json structure is expected to have keys like 'mens', 'womens', etc.
    // If keys are missing, we fallback to empty arrays to prevent crashes.
    setProducts({
      mens: db.mens || [],
      womens: db.womens || [],
      kids: db.kids || [],
      camping: db.camping || [],
    });
  }, []);

  // Cart Functions
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.title === product.title); // Using title as ID if no unique ID
      if (existing) {
        return prev.map(item =>
          item.title === product.title ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (title) => {
    setCart(prev => prev.filter(item => item.title !== title));
  };

  const updateQty = (title, delta) => {
    setCart(prev => prev.map(item => {
      if (item.title === title) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0;
    return acc + (price * item.qty);
  }, 0);

  // Search Function (Smart Search)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const allProducts = [
      ...products.mens,
      ...products.womens,
      ...products.kids
    ];

    const results = allProducts.filter(p =>
      p.title?.toLowerCase().includes(query) ||
      p.title2?.toLowerCase().includes(query)
    );

    setSearchResults(results.slice(0, 5)); // Limit to top 5
  }, [searchQuery, products]);

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQty,
      cartTotal,
      searchQuery,
      setSearchQuery,
      searchResults
    }}>
      {children}
    </ShopContext.Provider>
  );
};
