import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';

const Shop = ({ category }) => {
  const { products, addToCart } = useShop();
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Map route category to db key
    let dataKey = category;
    if (category === 'outdoor') dataKey = 'camping'; // Fallback if specific key needed 
    const data = products[dataKey] || [];
    setItems(data);
  }, [category, products]);

  // Category-specific fallback images
  const fallbacks = {
    mens: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80", // Men's fashion
    womens: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80", // Women's fashion
    kids: "https://images.unsplash.com/photo-1519238263496-65260f3e2610?auto=format&fit=crop&w=600&q=80", // Kids fashion
    outdoor: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80" // Outdoor gear
  };

  const handleImageError = (e) => {
    // Prevent infinite loop if fallback also fails
    if (e.target.src !== fallbacks[category]) {
      e.target.src = fallbacks[category] || fallbacks['mens'];
    }
  };

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <header style={{ marginBottom: '60px', textAlign: 'center' }}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-title"
          style={{ textTransform: 'uppercase', fontSize: '3rem' }}
        >
          {category === 'mens' ? "Gents' Collection" :
            category === 'womens' ? "Women's Couture" :
              category === 'kids' ? "Junior Edition" : "Outdoor Gear"}
        </motion.h1>
        <p style={{ color: 'var(--color-gold-primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          {items.length} Curated Styles
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '40px'
      }}>
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-panel"
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            {/* Image Section */}
            <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
              <img
                src={item.img1}
                onError={handleImageError}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1.0)'}
              />

              {/* Overlay Actions */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '20px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'
              }}>
                <div>
                  {item.jss219 && (
                    <span style={{
                      background: 'var(--color-coral-accent)', color: 'white',
                      padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold',
                      marginBottom: '8px', display: 'inline-block'
                    }}>
                      {item.jss219}
                    </span>
                  )}
                  <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '4px', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--color-gold-light)', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    ${item.price}
                  </p>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  style={{
                    background: 'white', color: 'black', border: 'none',
                    width: '40px', height: '40px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}
                >
                  <ShoppingBag size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
