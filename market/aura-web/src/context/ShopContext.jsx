// ... types removed
import React, { createContext, useState, useContext, useEffect } from 'react';
import db from '../db.json';

const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within a ShopProvider");
  return context;
}

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState({
    mens: [],
    womens: [],
    kids: [],
    camping: [],
    accessories: [],
    footwear: []
  });
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || 'user');

  useEffect(() => {
    const data = db;
    setProducts({
      mens: data.mens || [],
      womens: data.womens || [],
      kids: data.kids || [],
      camping: data.camping || [],
      accessories: [],
      footwear: []
    });
  }, []);

  const addToCart = (product, size, quantity = 1) => {
    setCart(prev => {
      // Create a unique key based on title AND size
      const existing = prev.find(item => item.title === product.title && item.size === size);

      if (existing) {
        return prev.map(item =>
          (item.title === product.title && item.size === size)
            ? { ...item, qty: item.qty + quantity }
            : item
        );
      }
      return [...prev, { ...product, size, qty: quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (title, size) => {
    setCart(prev => prev.filter(item => !(item.title === title && item.size === size)));
  };

  const updateQty = (title, size, delta) => {
    setCart(prev => prev.map(item => {
      if (item.title === title && item.size === size) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => {
    const price = typeof item.price === 'string'
      ? parseFloat(item.price.replace('$', ''))
      : item.price;
    return acc + (price * item.qty);
  }, 0);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const allProducts = [
      ...products.mens,
      ...products.womens,
      ...products.kids,
      ...products.camping
    ];

    const results = allProducts.filter(p =>
      p.title?.toLowerCase().includes(query) ||
      p.title2?.toLowerCase().includes(query)
    );

    setSearchResults(results.slice(0, 5));
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
      searchResults,
      clearCart: () => setCart([]),
      userRole,
      setUserRole
    }}>
      {children}
    </ShopContext.Provider>
  );
};
